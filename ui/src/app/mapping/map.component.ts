import { Component, ElementRef, ViewChild, AfterViewInit, ComponentRef, OnDestroy } from '@angular/core';
import L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapService, IMap, MapShapeType, IMapShape } from '../map.service';
import { MapEditorMenuComponent, IMapEditorOperation, MapEditorOperationType } from './map-editor-menu/map-editor-menu.component';
import { CampaignService } from '../campaign.service';
import { NoteService, NoteType, INote } from '../note.service';
import { filter } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { IEntity, EntityService } from '../entity.service';
import { UpdateHubService } from '../update-hub.service';
import { ToastrService } from 'ngx-toastr';
import 'leaflet-draw';
import { EntityViewMiniComponent } from '../entity/entity-view-mini/entity-view-mini.component';
import { ArticleService, IArticle } from '../article.service';
import { IconService } from '../icon.service';
import { DynComponentService } from '../dyn-component.service';
import { SelectorPopupComponent, ISelectOption } from '../custom-controls/selector-popup/selector-popup.component';
import { NoteViewMiniComponent } from '../notes/note-view-mini/note-view-mini.component';

const ownNoteIcon = L.icon({
  iconUrl: '/assets/note-icon.png',

  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

const otherNoteIcon = L.icon({
  iconUrl: '/assets/note-icon-2.png',

  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

let map: any;

const ENTITY_ICON_SIZE = 40;

@Component({
  selector: 'dd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  private map: ElementRef<HTMLDivElement>;

  @ViewChild('editor')
  private editor: MapEditorMenuComponent;

  @ViewChild('entityselect')
  private entitySelect: SelectorPopupComponent;

  @ViewChild('articleselect')
  private articleSelect: SelectorPopupComponent;

  private _map: IMap;
  private _notesLayerGroup: any;
  private _shapelyNotesLayerGroup: any;
  private _articlesLayerGroup: any;
  private _entityLayerGroups: { [key: string]: any } = {};
  private _mapLayerControl: any;
  private _drawControls: any;
  private _notes: INote[];
  private _articles: IArticle[];
  private _entityComponents: ComponentRef<EntityViewMiniComponent>[] = [];
  private _noteComponents: ComponentRef<NoteViewMiniComponent>[] = [];
  private _noteCreateSubscription: Subscription;
  private _noteDeleteSubscription: Subscription;
  private _noteUpdateSubscription: Subscription;
  private _entityUpdateSubscription: Subscription;
  private _articleUpdateSubscription: Subscription;
  private _articleDeleteSubscription: Subscription;

  private _queryLatLng: any[];

  public loading = false;
  public loadSelectItems: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private campaignService: CampaignService,
    private noteService: NoteService,
    private login: LoginService,
    private entityService: EntityService,
    private componentService: DynComponentService,
    private updateHub: UpdateHubService,
    private toast: ToastrService,
    private articleService: ArticleService,
    private iconService: IconService
  ) {
    this.loadSelectItems = (search) => {
      return this.getArticleSelectionList(search);
    };
  }

  ngAfterViewInit() {
    // The note service emits an event every time a note is created
    this._noteCreateSubscription = this.noteService.noteCreate.pipe(filter((n) => n.mapId === this._map.id)).subscribe((n) => {
      this.addNoteToMap(n);
    });

    // The note service emits an event every time a note is deleted
    this._noteDeleteSubscription = this.noteService.noteDelete.pipe(filter((n) => n.mapId === this._map.id)).subscribe((n) => {
      for (const layer of [...this._notesLayerGroup.getLayers(), ...this._shapelyNotesLayerGroup.getLayers()]) {
        if (layer['_noteId'] === n.id) {
          const popupComponent: ComponentRef<NoteViewMiniComponent> = layer['_noteComponent'];

          this._noteComponents = this._noteComponents.filter((nc) => nc !== popupComponent);

          popupComponent.destroy();
          this._notesLayerGroup.removeLayer(layer);
          this._shapelyNotesLayerGroup.removeLayer(layer);
        }
      }
    });

    // The note service emits an event every time a note is updated
    this._noteUpdateSubscription = this.noteService.noteUpdate.pipe(filter((n) => n.mapId === this._map.id)).subscribe((n) => {
      const noteLayer = [...this._notesLayerGroup.getLayers(), ...this._shapelyNotesLayerGroup.getLayers()].find(
        (l) => l['_noteId'] === n.id
      );

      if (noteLayer === undefined) {
        this.addNoteToMap(n);
      }
    });

    // The updatehub service emits an event every time an entity is updated
    this._entityUpdateSubscription = this.updateHub.entityUpdated.subscribe((e: IEntity) => {
      if (e.mapId === this._map.id) {
        if (!this._entityLayerGroups[e.preset.name]) {
          this.addEntityToMap(e);
          return;
        }

        const marker = this._entityLayerGroups[e.preset.name].getLayers().find((l) => l['_entity'].id === e.id);

        if (!marker) {
          this.addEntityToMap(e);
        } else {
          marker.setLatLng([e.lat, e.lng]);
          marker['_entityComponent'].instance.entity = e;
        }
      } else {
        this.removeEntityFromMap(e);
      }
    });

    this._articleUpdateSubscription = this.updateHub.articleUpdated.subscribe((article) => {
      if (article.mapId === this._map.id) {
        this.addArticleToMap(article);
      } else {
        this.removeArticleFromMap(article);
      }
    });

    this._articleDeleteSubscription = this.updateHub.articleDeleted.pipe(filter((a) => a.mapId === this._map.id)).subscribe((article) => {
      this.removeArticleFromMap(article);
    });

    this.route.paramMap.subscribe((params) => {
      if ((this._map && this._map.id !== params.get('m_id')) || !this._map) {
        this.loadMap(params.get('m_id'));
      }
    });
  }

  ngOnDestroy() {
    for (const nc of this._noteComponents) {
      nc.destroy();
    }

    for (const ec of this._entityComponents) {
      ec.destroy();
    }

    if (this._noteCreateSubscription) {
      this._noteCreateSubscription.unsubscribe();
    }

    if (this._noteDeleteSubscription) {
      this._noteDeleteSubscription.unsubscribe();
    }

    if (this._noteUpdateSubscription) {
      this._noteUpdateSubscription.unsubscribe();
    }

    if (this._entityUpdateSubscription) {
      this._entityUpdateSubscription.unsubscribe();
    }

    if (this._articleUpdateSubscription) {
      this._articleUpdateSubscription.unsubscribe();
    }

    if (this._articleDeleteSubscription) {
      this._articleDeleteSubscription.unsubscribe();
    }
  }

  private async loadMap(id: string) {
    this.loading = true;
    await this.load(id);
    this.constructMap();
    this.createNotesLayer();
    this.createArticlesLayer();
    await this.loadNotes(id);
    await this.loadArticles();
    this.loading = false;

    // Do entity setup
    // TODO move this into it's own function
    for (const entity of this.campaignService.campaign.entities) {
      if (entity.mapId === this._map.id && entity.lat && entity.lng) {
        this.addEntityToMap(entity);
      }
    }
  }

  private async loadArticles() {
    try {
      this._articles = await this.articleService.getMapArticles(this._map.id);
    } catch (err) {
      throw err;
    }

    if (this._articles) {
      for (const a of this._articles) {
        this.addArticleToMap(a);
      }
    }
  }

  private async load(id: string) {
    try {
      this._map = await this.mapService.getMap(id);
    } catch (err) {
      throw err;
    }
  }

  private async loadNotes(mapId: string) {
    try {
      this._notes = await this.noteService.getNotes(this.campaignService.campaign.id, {
        mapId: mapId,
      });
    } catch (err) {
      throw err;
    }
  }

  private constructMap() {
    map = L.map(this.map.nativeElement, {
      crs: L.CRS.Simple,
      maxBounds: [[0, 0], [-256, 256]],
      zoomSnap: 0.25,
    });

    const paramSnapshot = this.route.snapshot.queryParamMap;

    const presetZoom = paramSnapshot.get('zoom');
    const presetLat = paramSnapshot.get('lat');
    const presetLng = paramSnapshot.get('lng');

    if (presetZoom !== undefined && presetZoom !== null && !isNaN(presetZoom as any)) {
      map.setZoom(presetZoom);
    } else {
      map.setZoom(1);
    }

    if (
      presetLat !== null &&
      presetLng !== null &&
      presetLat !== undefined &&
      presetLng !== undefined &&
      !isNaN(presetLat as any) &&
      !isNaN(presetLng as any)
    ) {
      map.setView({ lat: presetLat, lng: presetLng });

      if (!presetZoom) {
        map.setZoom(this._map.maxZoom);
      }
    } else {
      map.fitBounds([[-10, 10], [-246, 246]]);
    }

    map.on('contextmenu', (e) => {
      this.editor.showMenu().then((operation) => {
        if (operation != null) {
          this.handleEditorOperation(operation, e);
        }
      });
    });

    map.on('zoomend', () => {
      this.writeMapStateToURL(map);
    });

    map.on('moveend', () => {
      this.writeMapStateToURL(map);
    });

    const tileLayer = L.tileLayer(`${environment.tileURL}/maps/{id}/tile/{z}/{x}/{y}`, {
      maxZoom: this._map.maxZoom + 2,
      minZoom: this._map.minZoom,
      minNativeZoom: 1,
      maxNativeZoom: this._map.maxZoom,
      bounds: [[0, 0], [-256, 256]],
      id: this._map.id,
    }).addTo(map);

    this._mapLayerControl = L.control.layers().addTo(map);
    this._mapLayerControl.addBaseLayer(tileLayer, 'Base');
  }

  private writeMapStateToURL(map) {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams: {
        zoom: map.getZoom(),
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
      },
    });
  }

  private addArticleToMap(article: IArticle) {
    // Check to see if this article already exists on the map
    const layers = this._articlesLayerGroup.getLayers();

    for (const l of layers) {
      if (l['_article'] && l['_article'].id === article.id) {
        l['_article'] = article;
        l.setLatLng([article.lat, article.lng]);
        l['_articleComponent'].instance.article = article;
        return;
      }
    }

    if (article.lat && article.lng) {
      const marker = L.marker([article.lat, article.lng]);

      if (article.icon !== null && article.icon !== undefined) {
        marker.setIcon(
          L.icon({
            iconUrl: this.iconService.getIconSrc(article.icon),
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20],
          })
        );
      } else {
        marker.setIcon(
          L.icon({
            iconUrl: '/assets/position-marker.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          })
        );
      }

      marker['_article'] = article;
      this._articlesLayerGroup.addLayer(marker);

      // Create popup
      const popup = L.popup({
        minWidth: 150,
      });

      popup.setContent(this.createArticlePopupContent(article));
      marker.bindPopup(popup);
    }
  }

  private createArticlePopupContent(article: IArticle) {
    const root = document.createElement('div');
    const title = document.createElement('h5');
    title.innerText = article.name;
    root.appendChild(title);

    const moreButton = document.createElement('button');
    moreButton.classList.add('btn', 'btn-sm');
    moreButton.innerText = 'More';
    moreButton.addEventListener('click', () => {
      this.router.navigate(['campaigns', this.campaignService.campaign.id, 'articles', article.id]);
    });

    root.appendChild(moreButton);
    return root;
  }

  private removeArticleFromMap(article: IArticle) {
    const layers = this._articlesLayerGroup.getLayers();

    for (const l of layers) {
      if (l['_article'] && l['_article'].id === article.id) {
        this._articlesLayerGroup.removeLayer(l);
      }
    }
  }

  private getDrawnShape(): Promise<IMapShape | null> {
    if (this._drawControls !== undefined) {
      throw new Error('Cannot have multiple draw controls!');
    }

    return new Promise((resolve, reject) => {
      const options = {
        position: 'topleft',
        draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: '<strong>Oh snap!<strong> you can\'t draw that!', // Message that will show when intersect
            },
          },
          circlemarker: false,
          marker: false,
        },
        edit: false,
      };

      this._drawControls = new L.Control.Draw(options);

      map.addControl(this._drawControls);

      // map.on('draw:edited', (e) => {
      //   map.removeControl(this._drawControls);
      //   this._drawControls = undefined;
      // });

      map.on('draw:created', (e) => {
        if (this._drawControls) {
          map.removeControl(this._drawControls);
          this._drawControls = undefined;
        }

        const l = e.layer;

        if (l instanceof L.Circle) {
          resolve({
            type: MapShapeType.CIRCLE,
            lat: l.getLatLng().lat,
            lng: l.getLatLng().lng,
            radius: l.getRadius(),
          });
        } else if (l instanceof L.Rectangle) {
          const latLngs = l.getLatLngs()[0];

          resolve({
            type: MapShapeType.RECTANGLE,
            points: latLngs.map((latLng) => [latLng.lat, latLng.lng]),
          });
        } else if (l instanceof L.Polygon) {
          resolve({
            type: MapShapeType.POLYGON,
            points: l.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]),
          });
        } else if (l instanceof L.Polyline) {
          resolve({
            type: MapShapeType.POLYLINE,
            points: l.getLatLngs().map((latLng) => [latLng.lat, latLng.lng]),
          });
        }
      });
    });
  }

  private createNotesLayer() {
    this._notesLayerGroup = L.layerGroup();
    this._notesLayerGroup.addTo(map);
    this._mapLayerControl.addOverlay(this._notesLayerGroup, 'Notes');

    this._shapelyNotesLayerGroup = L.layerGroup();
    this._shapelyNotesLayerGroup.addTo(map);
    this._mapLayerControl.addOverlay(this._shapelyNotesLayerGroup, 'Shapely Notes');
  }

  private createArticlesLayer() {
    this._articlesLayerGroup = L.layerGroup();
    this._articlesLayerGroup.addTo(map);
    this._mapLayerControl.addOverlay(this._articlesLayerGroup, 'Articles');
  }

  private createEntityLayer(name: string) {
    const layer = L.layerGroup();
    this._entityLayerGroups[name] = layer;
    layer.addTo(map);
    this._mapLayerControl.addOverlay(layer, name);
  }

  private addNoteToMap(note: INote) {
    if (note.mapShape) {
      let layerToAdd;
      const s = note.mapShape;

      switch (s.type) {
        case MapShapeType.CIRCLE:
          layerToAdd = L.circle([s.lat, s.lng], { radius: s.radius });
          break;
        case MapShapeType.POLYGON:
          layerToAdd = L.polygon(s.points);
          break;
        case MapShapeType.POLYLINE:
          layerToAdd = L.polyline(s.points);
          break;
        case MapShapeType.RECTANGLE:
          layerToAdd = L.rectangle(s.points);
          break;
      }

      layerToAdd['_noteId'] = note.id;

      const component = this.componentService.getComponent(NoteViewMiniComponent);
      component.instance.note = note;

      this._noteComponents.push(component);
      layerToAdd['_noteComponent'] = component;

      const popup = L.popup({
        minWidth: 150,
      });

      popup.setContent(this.componentService.getRootNode(component));

      layerToAdd.bindPopup(popup);

      this._shapelyNotesLayerGroup.addLayer(layerToAdd);
    } else if (note.lat && note.lng) {
      const isNoteMine = note.userId === this.login.id;

      const marker = L.marker([note.lat, note.lng], {
        icon: isNoteMine ? ownNoteIcon : otherNoteIcon,
      });

      marker['_noteId'] = note.id;

      const component = this.componentService.getComponent(NoteViewMiniComponent);
      component.instance.note = note;

      this._noteComponents.push(component);
      marker['_noteComponent'] = component;

      const popup = L.popup({
        minWidth: 150,
      });

      popup.setContent(this.componentService.getRootNode(component));

      marker.bindPopup(popup);

      this._notesLayerGroup.addLayer(marker);
    }
  }

  private addEntityToMap(entity: IEntity) {
    if (entity.lat && entity.lng) {
      const marker = L.marker([entity.lat, entity.lng], {
        icon: L.icon({
          // tslint:disable-next-line:max-line-length
          iconUrl: `https://res.cloudinary.com/dqhk8k6iv/image/upload/bo_2px_solid_rgb:303742,c_lfill,g_faces:auto,h_${ENTITY_ICON_SIZE},r_${ENTITY_ICON_SIZE /
            2},w_${ENTITY_ICON_SIZE},f_png/${entity.imageId}.png`,
          iconSize: [ENTITY_ICON_SIZE, ENTITY_ICON_SIZE],
          iconAnchor: [ENTITY_ICON_SIZE / 2, ENTITY_ICON_SIZE / 2],
          popupAnchor: [0, -(ENTITY_ICON_SIZE / 2)],
        }),
      });

      marker['_entity'] = entity;

      const component = this.componentService.getComponent(EntityViewMiniComponent);

      component.instance.entity = entity;
      this._entityComponents.push(component);
      marker['_entityComponent'] = component;

      if (!this._entityLayerGroups[entity.preset.name]) {
        this.createEntityLayer(entity.preset.name);
      }

      this._entityLayerGroups[entity.preset.name].addLayer(marker);

      const popup = L.popup({
        minWidth: 250,
      });

      popup.setContent(this.componentService.getRootNode(component));

      marker.bindPopup(popup);
    }
  }

  private removeEntityFromMap(e: IEntity) {
    if (this._entityLayerGroups[e.preset.name]) {
      // Remove them from this map if neccecary
      const marker = this._entityLayerGroups[e.preset.name].getLayers().find((l) => l['_entity'].id === e.id);

      if (marker) {
        this._entityLayerGroups[e.preset.name].removeLayer(marker);
        this._entityComponents = this._entityComponents.filter((ec) => ec !== marker['_entityComponent']);
        marker['_entityComponent'].destroy();
      }
    }
  }

  private async handleEditorOperation(op: IMapEditorOperation, event: any) {
    switch (op.type) {
      case MapEditorOperationType.PLACE_NOTE:
        this.noteService.addNote({
          type: NoteType.MAP,
          mapId: this._map.id,
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        });
        break;
      case MapEditorOperationType.UPDATE_ENTITY_POSITION:
        const entities = this.campaignService.editableEntities;
        let entity: IEntity;

        if (entities.length === 1) {
          entity = entities[0];
        } else {
          const entityList = this.campaignService.editableEntities.slice().filter((e) => e.spawnable === false);
          entity = await this.entitySelect.openSelector(
            entityList.map((e) => {
              return {
                value: e,
                displayHtml: e.name,
              };
            })
          );
        }

        if (entity) {
          await this.entityService.updateEntity({
            ...entity,
            mapId: this._map.id,
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          });

          this.toast.info(`Updated ${entity.name}'s position`);
        }
        break;
      case MapEditorOperationType.LINK_ARTICLE:
        const article: ISelectOption = await this.articleSelect.openSelector();

        if (article.value.id === 'create-new-article') {
          const createdArticle = await this.articleService.createArticle({
            name: article.value.name,
            content: null,
            campaignId: this.campaignService.campaign.id,
            userId: 'fake',
            published: false,
            tags: ['TODO'],
            mapId: this._map.id,
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          });

          this.addArticleToMap(createdArticle);

          this.toast.info(`Created and linked article ${createdArticle.name}`);
        } else {
          const fullArticle = await this.articleService.getArticle(article.value.id);

          if (article !== null) {
            await this.articleService.updateArticle({
              ...fullArticle,
              mapId: this._map.id,
              lat: event.latlng.lat,
              lng: event.latlng.lng,
            });

            this.toast.info(`Linked article ${article.value.name}`);
          }
        }

        break;
      case MapEditorOperationType.PLACE_SHAPELY_NOTE:
        const shape = await this.getDrawnShape();

        if (shape !== null) {
          this.noteService.addNote({
            type: NoteType.MAP,
            mapId: this._map.id,
            lat: event.latlng.lat,
            lng: event.latlng.lng,
            mapShape: shape,
          });
        }
        break;
    }
  }

  public async getArticleSelectionList(search: string): Promise<ISelectOption[]> {
    const articles = await this.articleService.getArticles(this.campaignService.campaign.id, 6, 0, search);

    const mappedArticles: ISelectOption[] = articles.map((a) => {
      return {
        value: a,
        displayHtml: a.name,
      };
    });

    if (search && search.trim().length > 2 && mappedArticles.length > 0) {
      mappedArticles.push({
        displayHtml: `<span><i class="icon icon-plus"></i> ${search}</span>`,
        value: {
          id: 'create-new-article',
          name: search,
        },
      });
    }

    return mappedArticles;
  }

  public async createNewArticle(name: string) {
    const article = await this.articleService.createArticle({
      name: name,
      content: null,
      campaignId: this.campaignService.campaign.id,
      userId: 'fake',
      published: false,
      tags: ['TODO'],
    });

    this.articleSelect.select({
      displayHtml: '',
      value: article,
    });
  }

  public get notes() {
    return this._notes;
  }

  public set notes(val: INote[]) {
    this._notes = val;
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get mapObj() {
    return this._map;
  }
}
