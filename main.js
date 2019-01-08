(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/action-queue.service.ts":
/*!*****************************************!*\
  !*** ./src/app/action-queue.service.ts ***!
  \*****************************************/
/*! exports provided: ActionQueueService, ActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionQueueService", function() { return ActionQueueService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionType", function() { return ActionType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ActionQueueService = /** @class */ (function () {
    function ActionQueueService() {
    }
    ActionQueueService.prototype.load = function () {
        var qJson = localStorage.getItem('action-queue');
        if (qJson) {
            this._queue = JSON.parse(qJson);
        }
        else {
            this._queue = [];
        }
    };
    ActionQueueService.prototype.save = function () {
        if (this._queue) {
            localStorage.setItem('action-queue', JSON.stringify(this._queue));
        }
    };
    ActionQueueService.prototype.clear = function () {
        localStorage.removeItem('action-queue');
        this._queue = undefined;
    };
    Object.defineProperty(ActionQueueService.prototype, "queue", {
        get: function () {
            this.load();
            return this._queue;
        },
        enumerable: true,
        configurable: true
    });
    ActionQueueService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [])
    ], ActionQueueService);
    return ActionQueueService;
}());

var ActionType;
(function (ActionType) {
    ActionType[ActionType["ACCOUNT_SETUP"] = 0] = "ACCOUNT_SETUP";
    ActionType[ActionType["INVITE"] = 1] = "INVITE";
})(ActionType || (ActionType = {}));


/***/ }),

/***/ "./src/app/action.guard.ts":
/*!*********************************!*\
  !*** ./src/app/action.guard.ts ***!
  \*********************************/
/*! exports provided: ActionGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionGuard", function() { return ActionGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _action_queue_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action-queue.service */ "./src/app/action-queue.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActionGuard = /** @class */ (function () {
    function ActionGuard(actions, router) {
        this.actions = actions;
        this.router = router;
    }
    ActionGuard.prototype.canActivate = function (next, state) {
        var queue = this.actions.queue;
        if (queue.length === 0) {
            return true;
        }
        else {
            var action = queue.pop();
            this.actions.save();
            console.log('Routing based on action', action);
            switch (action.type) {
                case _action_queue_service__WEBPACK_IMPORTED_MODULE_2__["ActionType"].ACCOUNT_SETUP:
                    this.router.navigate(['register']);
                    break;
                case _action_queue_service__WEBPACK_IMPORTED_MODULE_2__["ActionType"].INVITE:
                    this.router.navigate(['invite', action.data.inviteId]);
                    break;
            }
        }
        return false;
    };
    ActionGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_action_queue_service__WEBPACK_IMPORTED_MODULE_2__["ActionQueueService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ActionGuard);
    return ActionGuard;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _campaign_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./campaign.component */ "./src/app/campaign.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _logged_in_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logged-in.guard */ "./src/app/logged-in.guard.ts");
/* harmony import */ var _login_page_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login-page.guard */ "./src/app/login-page.guard.ts");
/* harmony import */ var _entity_entity_form_entity_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entity/entity-form/entity-form.component */ "./src/app/entity/entity-form/entity-form.component.ts");
/* harmony import */ var _entity_entity_view_entity_view_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entity/entity-view/entity-view.component */ "./src/app/entity/entity-view/entity-view.component.ts");
/* harmony import */ var _entity_entity_form_entity_creation_form_entity_creation_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./entity/entity-form/entity-creation-form/entity-creation-form.component */ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.ts");
/* harmony import */ var _entity_entity_form_entity_type_selector_entity_type_selector_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./entity/entity-form/entity-type-selector/entity-type-selector.component */ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.ts");
/* harmony import */ var _campaign_campaign_list_campaign_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./campaign/campaign-list/campaign-list.component */ "./src/app/campaign/campaign-list/campaign-list.component.ts");
/* harmony import */ var _items_item_manager_item_manager_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./items/item-manager/item-manager.component */ "./src/app/items/item-manager/item-manager.component.ts");
/* harmony import */ var _campaign_campaign_settings_campaign_settings_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./campaign/campaign-settings/campaign-settings.component */ "./src/app/campaign/campaign-settings/campaign-settings.component.ts");
/* harmony import */ var _quest_quest_manager_quest_manager_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./quest/quest-manager/quest-manager.component */ "./src/app/quest/quest-manager/quest-manager.component.ts");
/* harmony import */ var _items_item_edit_item_edit_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./items/item-edit/item-edit.component */ "./src/app/items/item-edit/item-edit.component.ts");
/* harmony import */ var _campaign_campaign_landing_campaign_landing_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./campaign/campaign-landing/campaign-landing.component */ "./src/app/campaign/campaign-landing/campaign-landing.component.ts");
/* harmony import */ var _login_register_register_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./login/register/register.component */ "./src/app/login/register/register.component.ts");
/* harmony import */ var _invite_invite_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./invite/invite.component */ "./src/app/invite/invite.component.ts");
/* harmony import */ var _action_guard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./action.guard */ "./src/app/action.guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'invite/:invite_id', component: _invite_invite_component__WEBPACK_IMPORTED_MODULE_18__["InviteComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], canActivate: [_login_page_guard__WEBPACK_IMPORTED_MODULE_6__["LoginPageGuard"]] },
    { path: 'register', component: _login_register_register_component__WEBPACK_IMPORTED_MODULE_17__["RegisterComponent"] },
    { path: 'callback', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    {
        path: 'campaigns/list',
        component: _campaign_campaign_list_campaign_list_component__WEBPACK_IMPORTED_MODULE_11__["CampaignListComponent"],
        canActivate: [_logged_in_guard__WEBPACK_IMPORTED_MODULE_5__["LoggedInGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"]],
    },
    {
        path: 'home',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
        canActivate: [_logged_in_guard__WEBPACK_IMPORTED_MODULE_5__["LoggedInGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"]],
    },
    {
        path: 'campaigns/create',
        component: _campaign_campaign_settings_campaign_settings_component__WEBPACK_IMPORTED_MODULE_13__["CampaignSettingsComponent"],
        canActivate: [_logged_in_guard__WEBPACK_IMPORTED_MODULE_5__["LoggedInGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"]],
        data: {
            editing: false,
        },
    },
    {
        path: 'campaign/manage/:id',
        component: _campaign_component__WEBPACK_IMPORTED_MODULE_2__["CampaignComponent"],
        canActivate: [_logged_in_guard__WEBPACK_IMPORTED_MODULE_5__["LoggedInGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"]],
        children: [
            {
                path: 'items',
                component: _items_item_manager_item_manager_component__WEBPACK_IMPORTED_MODULE_12__["ItemManagerComponent"],
            },
            {
                path: 'settings',
                component: _campaign_campaign_settings_campaign_settings_component__WEBPACK_IMPORTED_MODULE_13__["CampaignSettingsComponent"],
                data: {
                    editing: true,
                },
            },
            {
                path: 'quests',
                component: _quest_quest_manager_quest_manager_component__WEBPACK_IMPORTED_MODULE_14__["QuestManagerComponent"],
            },
            {
                path: 'items/:item_id/edit',
                component: _items_item_edit_item_edit_component__WEBPACK_IMPORTED_MODULE_15__["ItemEditComponent"],
            },
            {
                path: 'entities/create',
                component: _entity_entity_form_entity_form_component__WEBPACK_IMPORTED_MODULE_7__["EntityFormComponent"],
                data: {
                    editing: false,
                },
            },
            {
                path: 'entities/:ent_id/edit',
                component: _entity_entity_form_entity_form_component__WEBPACK_IMPORTED_MODULE_7__["EntityFormComponent"],
                data: {
                    editing: true,
                },
            },
        ],
    },
    {
        path: 'campaigns/:id',
        component: _campaign_component__WEBPACK_IMPORTED_MODULE_2__["CampaignComponent"],
        canActivate: [_logged_in_guard__WEBPACK_IMPORTED_MODULE_5__["LoggedInGuard"], _action_guard__WEBPACK_IMPORTED_MODULE_19__["ActionGuard"]],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'landing',
            },
            {
                path: 'landing',
                component: _campaign_campaign_landing_campaign_landing_component__WEBPACK_IMPORTED_MODULE_16__["CampaignLandingComponent"],
            },
            {
                path: 'entities/selecttype',
                component: _entity_entity_form_entity_type_selector_entity_type_selector_component__WEBPACK_IMPORTED_MODULE_10__["EntityTypeSelectorComponent"],
            },
            {
                path: 'entities/:ent_id',
                component: _entity_entity_view_entity_view_component__WEBPACK_IMPORTED_MODULE_8__["EntityViewComponent"],
            },
            {
                path: 'entities/:ent_type_id/create',
                component: _entity_entity_form_entity_creation_form_entity_creation_form_component__WEBPACK_IMPORTED_MODULE_9__["EntityCreationFormComponent"],
                data: {
                    editing: false,
                },
            },
            {
                path: 'entities/:ent_id/edit',
                component: _entity_entity_form_entity_creation_form_entity_creation_form_component__WEBPACK_IMPORTED_MODULE_9__["EntityCreationFormComponent"],
                data: {
                    editing: true,
                },
            },
        ],
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-nav></dd-nav> <router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'ui';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_truncate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-truncate */ "./node_modules/ng2-truncate/dist/index.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _image_upload_image_upload_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./image-upload/image-upload.component */ "./src/app/image-upload/image-upload.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _campaign_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./campaign.component */ "./src/app/campaign.component.ts");
/* harmony import */ var _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./paginator/paginator.component */ "./src/app/paginator/paginator.component.ts");
/* harmony import */ var _modal_modal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modal/modal.component */ "./src/app/modal/modal.component.ts");
/* harmony import */ var _confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./confirmation-modal/confirmation-modal.component */ "./src/app/confirmation-modal/confirmation-modal.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _entity_entity_attribute_row_editor_entity_attribute_row_editor_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./entity/entity-attribute-row-editor/entity-attribute-row-editor.component */ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.ts");
/* harmony import */ var _entity_entity_form_entity_form_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./entity/entity-form/entity-form.component */ "./src/app/entity/entity-form/entity-form.component.ts");
/* harmony import */ var _entity_entity_form_entity_type_selector_entity_type_selector_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./entity/entity-form/entity-type-selector/entity-type-selector.component */ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.ts");
/* harmony import */ var _entity_entity_form_entity_creation_form_entity_creation_form_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./entity/entity-form/entity-creation-form/entity-creation-form.component */ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.ts");
/* harmony import */ var _entity_entity_view_entity_view_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./entity/entity-view/entity-view.component */ "./src/app/entity/entity-view/entity-view.component.ts");
/* harmony import */ var _items_item_view_list_item_view_list_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./items/item-view-list/item-view-list.component */ "./src/app/items/item-view-list/item-view-list.component.ts");
/* harmony import */ var _items_item_form_item_form_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./items/item-form/item-form.component */ "./src/app/items/item-form/item-form.component.ts");
/* harmony import */ var _items_attribute_editor_attribute_editor_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./items/attribute-editor/attribute-editor.component */ "./src/app/items/attribute-editor/attribute-editor.component.ts");
/* harmony import */ var _items_item_manager_item_manager_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./items/item-manager/item-manager.component */ "./src/app/items/item-manager/item-manager.component.ts");
/* harmony import */ var _campaign_campaign_list_campaign_list_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./campaign/campaign-list/campaign-list.component */ "./src/app/campaign/campaign-list/campaign-list.component.ts");
/* harmony import */ var _campaign_campaign_landing_campaign_landing_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./campaign/campaign-landing/campaign-landing.component */ "./src/app/campaign/campaign-landing/campaign-landing.component.ts");
/* harmony import */ var _items_item_edit_item_edit_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./items/item-edit/item-edit.component */ "./src/app/items/item-edit/item-edit.component.ts");
/* harmony import */ var _campaign_campaign_settings_campaign_settings_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./campaign/campaign-settings/campaign-settings.component */ "./src/app/campaign/campaign-settings/campaign-settings.component.ts");
/* harmony import */ var _campaign_campaign_settings_entity_types_entity_types_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./campaign/campaign-settings/entity-types/entity-types.component */ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.ts");
/* harmony import */ var _entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./entity/dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
/* harmony import */ var _items_inventory_selector_inventory_selector_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./items/inventory-selector/inventory-selector.component */ "./src/app/items/inventory-selector/inventory-selector.component.ts");
/* harmony import */ var _campaign_campaign_settings_experience_table_editor_experience_table_editor_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./campaign/campaign-settings/experience-table-editor/experience-table-editor.component */ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.ts");
/* harmony import */ var _quest_quest_manager_quest_manager_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./quest/quest-manager/quest-manager.component */ "./src/app/quest/quest-manager/quest-manager.component.ts");
/* harmony import */ var _entity_entity_view_entity_attribute_editor_modal_entity_attribute_editor_modal_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component */ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.ts");
/* harmony import */ var _quest_quest_form_quest_form_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./quest/quest-form/quest-form.component */ "./src/app/quest/quest-form/quest-form.component.ts");
/* harmony import */ var _login_register_register_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./login/register/register.component */ "./src/app/login/register/register.component.ts");
/* harmony import */ var _campaign_campaign_form_campaign_form_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./campaign/campaign-form/campaign-form.component */ "./src/app/campaign/campaign-form/campaign-form.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_interceptor__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./auth.interceptor */ "./src/app/auth.interceptor.ts");
/* harmony import */ var _campaign_invite_manager_invite_manager_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./campaign/invite-manager/invite-manager.component */ "./src/app/campaign/invite-manager/invite-manager.component.ts");
/* harmony import */ var _invite_invite_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./invite/invite.component */ "./src/app/invite/invite.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _items_item_view_list_item_view_list_component__WEBPACK_IMPORTED_MODULE_19__["ItemViewListComponent"],
                _items_item_form_item_form_component__WEBPACK_IMPORTED_MODULE_20__["ItemFormComponent"],
                _image_upload_image_upload_component__WEBPACK_IMPORTED_MODULE_5__["ImageUploadComponent"],
                _items_attribute_editor_attribute_editor_component__WEBPACK_IMPORTED_MODULE_21__["AttributeEditorComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__["NavComponent"],
                _items_item_manager_item_manager_component__WEBPACK_IMPORTED_MODULE_22__["ItemManagerComponent"],
                _campaign_component__WEBPACK_IMPORTED_MODULE_8__["CampaignComponent"],
                _campaign_campaign_list_campaign_list_component__WEBPACK_IMPORTED_MODULE_23__["CampaignListComponent"],
                _campaign_campaign_landing_campaign_landing_component__WEBPACK_IMPORTED_MODULE_24__["CampaignLandingComponent"],
                _items_item_edit_item_edit_component__WEBPACK_IMPORTED_MODULE_25__["ItemEditComponent"],
                _paginator_paginator_component__WEBPACK_IMPORTED_MODULE_9__["PaginatorComponent"],
                _campaign_campaign_settings_campaign_settings_component__WEBPACK_IMPORTED_MODULE_26__["CampaignSettingsComponent"],
                _campaign_campaign_settings_entity_types_entity_types_component__WEBPACK_IMPORTED_MODULE_27__["EntityTypesComponent"],
                _entity_entity_attribute_row_editor_entity_attribute_row_editor_component__WEBPACK_IMPORTED_MODULE_14__["EntityAttributeRowEditorComponent"],
                _entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_28__["DynamicAttributeFormComponent"],
                _entity_entity_form_entity_form_component__WEBPACK_IMPORTED_MODULE_15__["EntityFormComponent"],
                _modal_modal_component__WEBPACK_IMPORTED_MODULE_10__["ModalComponent"],
                _items_inventory_selector_inventory_selector_component__WEBPACK_IMPORTED_MODULE_29__["InventorySelectorComponent"],
                _confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_11__["ConfirmationModalComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_13__["HomeComponent"],
                _entity_entity_form_entity_type_selector_entity_type_selector_component__WEBPACK_IMPORTED_MODULE_16__["EntityTypeSelectorComponent"],
                _entity_entity_form_entity_creation_form_entity_creation_form_component__WEBPACK_IMPORTED_MODULE_17__["EntityCreationFormComponent"],
                _campaign_campaign_settings_experience_table_editor_experience_table_editor_component__WEBPACK_IMPORTED_MODULE_30__["ExperienceTableEditorComponent"],
                _quest_quest_manager_quest_manager_component__WEBPACK_IMPORTED_MODULE_31__["QuestManagerComponent"],
                _entity_entity_view_entity_view_component__WEBPACK_IMPORTED_MODULE_18__["EntityViewComponent"],
                _entity_entity_view_entity_attribute_editor_modal_entity_attribute_editor_modal_component__WEBPACK_IMPORTED_MODULE_32__["EntityAttributeEditorModalComponent"],
                _quest_quest_form_quest_form_component__WEBPACK_IMPORTED_MODULE_33__["QuestFormComponent"],
                _login_register_register_component__WEBPACK_IMPORTED_MODULE_34__["RegisterComponent"],
                _campaign_campaign_form_campaign_form_component__WEBPACK_IMPORTED_MODULE_35__["CampaignFormComponent"],
                _campaign_invite_manager_invite_manager_component__WEBPACK_IMPORTED_MODULE_38__["InviteManagerComponent"],
                _invite_invite_component__WEBPACK_IMPORTED_MODULE_39__["InviteComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                ng2_truncate__WEBPACK_IMPORTED_MODULE_2__["TruncateModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HttpClientModule"],
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_36__["HTTP_INTERCEPTORS"],
                    useClass: _auth_interceptor__WEBPACK_IMPORTED_MODULE_37__["AuthInterceptor"],
                    multi: true,
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/attributes.ts":
/*!*******************************!*\
  !*** ./src/app/attributes.ts ***!
  \*******************************/
/*! exports provided: AttributeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeType", function() { return AttributeType; });
var AttributeType;
(function (AttributeType) {
    AttributeType[AttributeType["STRING"] = 0] = "STRING";
    AttributeType[AttributeType["NUMBER"] = 1] = "NUMBER";
    AttributeType[AttributeType["ENUM"] = 2] = "ENUM";
})(AttributeType || (AttributeType = {}));


/***/ }),

/***/ "./src/app/auth.interceptor.ts":
/*!*************************************!*\
  !*** ./src/app/auth.interceptor.ts ***!
  \*************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(login) {
        this.login = login;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var token = localStorage.getItem('auth-token');
        if (token) {
            var cloned = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + token),
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_0__["LoginService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/campaign.component.css":
/*!****************************************!*\
  !*** ./src/app/campaign.component.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign.component.html":
/*!*****************************************!*\
  !*** ./src/app/campaign.component.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n\n<router-outlet *ngIf=\"campaign\"></router-outlet>\n"

/***/ }),

/***/ "./src/app/campaign.component.ts":
/*!***************************************!*\
  !*** ./src/app/campaign.component.ts ***!
  \***************************************/
/*! exports provided: CampaignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignComponent", function() { return CampaignComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CampaignComponent = /** @class */ (function () {
    function CampaignComponent(campaignService, route) {
        this.campaignService = campaignService;
        this.route = route;
    }
    CampaignComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.loading && !this.campaign) {
            this.route.params.subscribe(function (params) {
                _this.campaignService.setSelection(params.id);
            });
        }
    };
    Object.defineProperty(CampaignComponent.prototype, "loading", {
        get: function () {
            return this.campaignService.loadingCampaign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignComponent.prototype, "campaign", {
        get: function () {
            return this.campaignService.campaign;
        },
        enumerable: true,
        configurable: true
    });
    CampaignComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-campaign',
            template: __webpack_require__(/*! ./campaign.component.html */ "./src/app/campaign.component.html"),
            styles: [__webpack_require__(/*! ./campaign.component.css */ "./src/app/campaign.component.css")],
        }),
        __metadata("design:paramtypes", [_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], CampaignComponent);
    return CampaignComponent;
}());



/***/ }),

/***/ "./src/app/campaign.service.ts":
/*!*************************************!*\
  !*** ./src/app/campaign.service.ts ***!
  \*************************************/
/*! exports provided: CampaignService, CampaignInviteStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignService", function() { return CampaignService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignInviteStatus", function() { return CampaignInviteStatus; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CampaignService = /** @class */ (function () {
    function CampaignService(http) {
        this.http = http;
        this.campaign = null;
        this.loadingCampaign = false;
    }
    CampaignService.prototype.setSelection = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var campaign, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.campaign = null;
                        this.loadingCampaign = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getCampaign(campaignId)];
                    case 2:
                        campaign = _a.sent();
                        this.campaign = campaign;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('LOAD ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loadingCampaign = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a list of campaigns the user can access
     */
    CampaignService.prototype.getCampaigns = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigns")
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.getCampaign = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigns/" + id)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.createCampaign = function (campaign) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigns", campaign)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.updateCampaign = function (campaign) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigns/" + campaign.id, campaign)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.getInvites = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites?campaignId=" + this.campaign.id)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.getInvite = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites/" + id)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.createInvite = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites", {
                        campaignId: this.campaign.id,
                        name: name,
                    })
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.updateInvite = function (invite) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites/" + invite.id, invite)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.deleteInvite = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites/" + token)
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.acceptInvite = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites/" + token + "/accept", {})
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.denyInvite = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/campaigninvites/" + token + "/decline", {})
                        .toPromise()];
            });
        });
    };
    CampaignService.prototype.calculateLevel = function (xp) {
        if (!this.campaign) {
            throw new Error('No campaign present');
        }
        var xpTable = this.campaign.experienceTable || [];
        var level = 1;
        for (var i = 0; i < xpTable.length; i++) {
            var xpRequired = xpTable[i];
            if (xp >= xpRequired) {
                level++;
            }
            else {
                break;
            }
        }
        return level;
    };
    CampaignService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CampaignService);
    return CampaignService;
}());

var CampaignInviteStatus;
(function (CampaignInviteStatus) {
    CampaignInviteStatus[CampaignInviteStatus["PENDING"] = 0] = "PENDING";
    CampaignInviteStatus[CampaignInviteStatus["REVOKED"] = 1] = "REVOKED";
    CampaignInviteStatus[CampaignInviteStatus["ACCEPTED"] = 2] = "ACCEPTED";
})(CampaignInviteStatus || (CampaignInviteStatus = {}));
// Used in mock apis, will be removed
var simulateDelay = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};


/***/ }),

/***/ "./src/app/campaign/campaign-form/campaign-form.component.css":
/*!********************************************************************!*\
  !*** ./src/app/campaign/campaign-form/campaign-form.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/campaign-form/campaign-form.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/campaign/campaign-form/campaign-form.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\" [formGroup]=\"formGroup\">\n  <div class=\"columns\">\n    <div class=\"column col-auto\">\n      <dd-image-upload [formGroup]=\"formGroup\"></dd-image-upload>\n    </div>\n    <div class=\"column\">\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{\n          'has-error': name.invalid && (name.dirty || name.touched)\n        }\"\n      >\n        <label for=\"name\" class=\"form-label\">Name</label>\n        <input\n          type=\"text\"\n          name=\"name\"\n          formControlName=\"name\"\n          id=\"name\"\n          class=\"form-input\"\n          placeholder=\"Name\"\n        />\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            name.invalid && (name.dirty || name.touched) && name.errors.required\n          \"\n        >\n          A name is required\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            name.invalid &&\n            (name.dirty || name.touched) &&\n            name.errors.minlength\n          \"\n        >\n          The name cannot be shorter than 3 characters\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            name.invalid &&\n            (name.dirty || name.touched) &&\n            name.errors.maxlength\n          \"\n        >\n          The name cannot be longer than 30 characters\n        </p>\n      </div>\n\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{\n          'has-error':\n            description.invalid && (description.dirty || description.touched)\n        }\"\n      >\n        <label for=\"description\" class=\"form-label\">Description</label>\n        <textarea\n          formControlName=\"description\"\n          name=\"description\"\n          id=\"description\"\n          rows=\"5\"\n          class=\"form-input\"\n          placeholder=\"Description\"\n        ></textarea>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            description.invalid &&\n            (description.dirty || description.touched) &&\n            description.errors.required\n          \"\n        >\n          A description is required\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            description.invalid &&\n            (description.dirty || description.touched) &&\n            description.errors.minlength\n          \"\n        >\n          The description cannot be shorter than 3 characters\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-form/campaign-form.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/campaign/campaign-form/campaign-form.component.ts ***!
  \*******************************************************************/
/*! exports provided: CampaignFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignFormComponent", function() { return CampaignFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CampaignFormComponent = /** @class */ (function () {
    function CampaignFormComponent() {
    }
    CampaignFormComponent.prototype.ngOnInit = function () {
        this.formGroup.addControl('name', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.campaign ? this.campaign.name : null, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30),
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
        ]));
        this.formGroup.addControl('description', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.campaign ? this.campaign.description : null, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
        ]));
        this.formGroup.addControl('imageId', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.campaign.imageId === '' || !this.campaign
            ? null
            : this.campaign.imageId, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]));
    };
    Object.defineProperty(CampaignFormComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignFormComponent.prototype, "description", {
        get: function () {
            return this.formGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], CampaignFormComponent.prototype, "formGroup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CampaignFormComponent.prototype, "campaign", void 0);
    CampaignFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-campaign-form',
            template: __webpack_require__(/*! ./campaign-form.component.html */ "./src/app/campaign/campaign-form/campaign-form.component.html"),
            styles: [__webpack_require__(/*! ./campaign-form.component.css */ "./src/app/campaign/campaign-form/campaign-form.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], CampaignFormComponent);
    return CampaignFormComponent;
}());



/***/ }),

/***/ "./src/app/campaign/campaign-landing/campaign-landing.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/campaign/campaign-landing/campaign-landing.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-modal #invites size=\"large\">\n  <div modal-header><h4>Manage Invites</h4></div>\n  <div modal-body><dd-invite-manager></dd-invite-manager></div>\n</dd-modal>\n\n<div class=\"container grid-xl\" *ngIf=\"campaign\">\n  <!-- Active Session Card -->\n  <div class=\"card p-2\">\n    <div class=\"columns\">\n      <div class=\"column\">\n        <span class=\"text-large text-bold\"\n          >There is currently an active session!</span\n        >\n      </div>\n      <div class=\"column col-auto col-ml-auto\">\n        <button class=\"btn btn-primary\">\n          Join Session <i class=\"icon icon-arrow-right\"></i>\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Header -->\n  <div class=\"columns\">\n    <div class=\"column col-auto\">\n      <h1>{{ campaign.name }}</h1>\n    </div>\n    <div class=\"column col-auto col-ml-auto\">\n      <div class=\"dropdown dropdown-right\">\n        <button class=\"btn btn-link dropdown-toggle\">\n          Menu <i class=\"icon icon-caret\"></i>\n        </button>\n\n        <ul class=\"menu\">\n          <li class=\"menu-item\">\n            <a [routerLink]=\"['..', 'entities', 'selecttype']\">\n              Create Entity\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"columns\">\n    <!-- Description -->\n    <div class=\"column col-9 col-xl-8 col-md-12\">\n      <p>{{ campaign.description }}</p>\n    </div>\n\n    <!-- Sidebar -->\n    <div class=\"column col-3 col-md-12 col-xl-4 col-ml-auto\">\n      <!-- Members Listing -->\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <div class=\"columns\">\n            <div class=\"column\"><h5>Members</h5></div>\n            <div class=\"column col-auto col-ml-auto\">\n              <button class=\"btn btn-sm\" (click)=\"invites.open()\">\n                <i class=\"icon icon-plus\"></i> Invite Members\n              </button>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card-body\">\n          <div\n            class=\"tile tile-centered mb-2\"\n            *ngFor=\"let u of campaign.members\"\n          >\n            <div class=\"tile-icon\">\n              <figure class=\"avatar\"><img [src]=\"u.user.pictureURL\" /></figure>\n            </div>\n            <div class=\"tile-content\">\n              <div class=\"tile-title\">{{ u.user.username }}</div>\n              <div class=\"d-flex\">\n                <span\n                  class=\"chip hoverable-chip\"\n                  (click)=\"selectEntity(e)\"\n                  *ngFor=\"let e of userEntities(u.user.id)\"\n                >\n                  <img\n                    src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n                      e.imageId\n                    }}.png\"\n                    class=\"avatar avatar-sm\"\n                  />\n                  {{ e.name }}\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-landing/campaign-landing.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/campaign/campaign-landing/campaign-landing.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".d-flex > .chip {\n  flex-shrink: 0;\n  flex-grow: 0; }\n\n.d-flex {\n  flex-wrap: wrap; }\n\n.hoverable-chip {\n  transition: -webkit-transform 0.25s;\n  transition: transform 0.25s;\n  transition: transform 0.25s, -webkit-transform 0.25s; }\n\n.hoverable-chip:hover {\n  -webkit-transform: scale(1.05);\n          transform: scale(1.05);\n  cursor: pointer;\n  background-color: #5755d9;\n  color: #fff; }\n"

/***/ }),

/***/ "./src/app/campaign/campaign-landing/campaign-landing.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/campaign/campaign-landing/campaign-landing.component.ts ***!
  \*************************************************************************/
/*! exports provided: CampaignLandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignLandingComponent", function() { return CampaignLandingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modal/modal.component */ "./src/app/modal/modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CampaignLandingComponent = /** @class */ (function () {
    function CampaignLandingComponent(campaignService, router, route) {
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
    }
    CampaignLandingComponent.prototype.ngOnInit = function () { };
    CampaignLandingComponent.prototype.userEntities = function (id) {
        return this.campaign.entities.filter(function (e) { return e.user.id === id; });
    };
    CampaignLandingComponent.prototype.selectEntity = function (entity) {
        this.router.navigate(['..', 'entities', entity.id], {
            relativeTo: this.route,
        });
    };
    Object.defineProperty(CampaignLandingComponent.prototype, "campaign", {
        get: function () {
            return this.campaignService.campaign;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('invites'),
        __metadata("design:type", src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_3__["ModalComponent"])
    ], CampaignLandingComponent.prototype, "invites", void 0);
    CampaignLandingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-campaign-landing',
            template: __webpack_require__(/*! ./campaign-landing.component.html */ "./src/app/campaign/campaign-landing/campaign-landing.component.html"),
            styles: [__webpack_require__(/*! ./campaign-landing.component.scss */ "./src/app/campaign/campaign-landing/campaign-landing.component.scss")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], CampaignLandingComponent);
    return CampaignLandingComponent;
}());



/***/ }),

/***/ "./src/app/campaign/campaign-list/campaign-list.component.css":
/*!********************************************************************!*\
  !*** ./src/app/campaign/campaign-list/campaign-list.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/campaign-list/campaign-list.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/campaign/campaign-list/campaign-list.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <div class=\"columns\">\n    <div class=\"column\"><h3>Campaigns</h3></div>\n    <div class=\"column col-auto col-ml-auto\">\n      <button class=\"btn btn-sm\" (click)=\"createCampaign()\">\n        <i class=\"icon icon-plus\"></i> Create Campaign\n      </button>\n    </div>\n  </div>\n  <div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n\n  <!-- Campaign Empty State -->\n  <div class=\"empty\" *ngIf=\"campaigns && campaigns.length === 0\">\n    <div class=\"empty-icon\"><i class=\"icon icon-search icon-4x\"></i></div>\n    <p class=\"empty-title h5\">There are no campaigns here</p>\n    <p class=\"empty-subtitle\">\n      Click the button to create your own, or ask your DM for an invite\n    </p>\n    <div class=\"empty-action\">\n      <button class=\"btn btn-primary\" (click)=\"createCampaign()\">\n        Create Campaign\n      </button>\n    </div>\n  </div>\n\n  <!-- Display Campaings -->\n  <div *ngFor=\"let c of campaigns\">\n    <div class=\"card hoverable p-2 mb-2\" (click)=\"selectCampaign(c)\">\n      <div class=\"columns\">\n        <div class=\"column col-auto\" *ngIf=\"c.imageId\">\n          <figure class=\"avatar avatar-lg\">\n            <img\n              src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n                c.imageId\n              }}.png\"\n            />\n          </figure>\n        </div>\n        <div class=\"column\">\n          <div class=\"columns\">\n            <div class=\"column\">\n              <h4 class=\"mb-1\">{{ c.name }}</h4>\n            </div>\n            <div class=\"column col-auto col-ml-auto\">\n              <span class=\"text-gray text-italic\"> Example Text </span>\n            </div>\n          </div>\n          <span class=\"text-gray\">{{ c.description | truncate: 150 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-list/campaign-list.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/campaign/campaign-list/campaign-list.component.ts ***!
  \*******************************************************************/
/*! exports provided: CampaignListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignListComponent", function() { return CampaignListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CampaignListComponent = /** @class */ (function () {
    function CampaignListComponent(campaignService, router) {
        this.campaignService = campaignService;
        this.router = router;
        this.loading = false;
        this.creating = false;
        this.campaigns = null;
    }
    CampaignListComponent.prototype.ngOnInit = function () {
        this.loadCampaigns();
    };
    CampaignListComponent.prototype.createCampaign = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['campaigns', 'create']);
                return [2 /*return*/];
            });
        });
    };
    CampaignListComponent.prototype.selectCampaign = function (campaign) {
        this.campaignService.setSelection(campaign.id);
        this.router.navigate(['campaigns', campaign.id]);
    };
    CampaignListComponent.prototype.loadCampaigns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var campaigns, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.campaignService.getCampaigns()];
                    case 2:
                        campaigns = _a.sent();
                        this.campaigns = campaigns;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    CampaignListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-campaign-list',
            template: __webpack_require__(/*! ./campaign-list.component.html */ "./src/app/campaign/campaign-list/campaign-list.component.html"),
            styles: [__webpack_require__(/*! ./campaign-list.component.css */ "./src/app/campaign/campaign-list/campaign-list.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], CampaignListComponent);
    return CampaignListComponent;
}());



/***/ }),

/***/ "./src/app/campaign/campaign-settings/campaign-settings.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/campaign-settings.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/campaign-settings/campaign-settings.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/campaign-settings.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\" *ngIf=\"campaign || !editing\">\n  <!-- Header -->\n  <div class=\"columns\">\n    <div class=\"column\"><h2>Settings</h2></div>\n    <div class=\"column col-auto col-ml-auto\">\n      <button\n        class=\"btn\"\n        [disabled]=\"formGroup.invalid\"\n        (click)=\"save()\"\n        [ngClass]=\"{ loading: saving }\"\n      >\n        Save\n      </button>\n    </div>\n  </div>\n\n  <h3>General Settings</h3>\n  <dd-campaign-form\n    [campaign]=\"campaign\"\n    [formGroup]=\"formGroup\"\n  ></dd-campaign-form>\n\n  <!-- Experience Table -->\n  <div class=\"columns mt-2\">\n    <div class=\"column\"><h3 class=\"mt-2 mb-0\">Experience Table</h3></div>\n    <div class=\"column col-auto col-ml-auto\">\n      <button\n        class=\"btn btn-sm\"\n        *ngIf=\"!expandXPTable\"\n        (click)=\"expandXPTable = !expandXPTable\"\n      >\n        Expand <i class=\"icon icon-arrow-down\"></i>\n      </button>\n      <button\n        class=\"btn btn-sm\"\n        *ngIf=\"expandXPTable\"\n        (click)=\"expandXPTable = !expandXPTable\"\n      >\n        Collapse <i class=\"icon icon-arrow-up\"></i>\n      </button>\n    </div>\n  </div>\n  <span class=\"text-gray\" *ngIf=\"expandXPTable\"\n    >This is the experience table. This will determine entities' levels based on\n    the amount of XP they have. For example, if level 2 was set to 30 XP, an\n    entity would be level 2 when they reach 30 or above XP.</span\n  >\n  <dd-experience-table-editor\n    [campaign]=\"campaign\"\n    [formGroup]=\"formGroup\"\n    *ngIf=\"expandXPTable\"\n  ></dd-experience-table-editor>\n\n  <!-- Entity Types -->\n  <div class=\"columns mt-2\" *ngIf=\"editing\">\n    <div class=\"column\"><h3>Entity Types</h3></div>\n    <div class=\"column col-auto\">\n      <button class=\"btn btn-sm\" (click)=\"createEntityPreset()\">\n        <i class=\"icon icon-plus\"></i> Create Entity Preset\n      </button>\n    </div>\n  </div>\n  <div class=\"empty\" *ngIf=\"editing && campaign.entityPresets.length === 0\">\n    <div class=\"empty-icon\"><i class=\"icon icon-search icon-4x\"></i></div>\n    <p class=\"empty-title h5\">There are no entity presets :(</p>\n    <p class=\"empty-subtitle\">Click the button to create one</p>\n    <div class=\"empty-action\">\n      <button class=\"btn btn-primary\" (click)=\"createEntityPreset()\">\n        Create Preset\n      </button>\n    </div>\n  </div>\n  <div *ngIf=\"editing\">\n    <div\n      class=\"card p-2 mb-2 hoverable\"\n      *ngFor=\"let ep of campaign.entityPresets\"\n      (click)=\"selectEntityPreset(ep)\"\n    >\n      <div class=\"columns\">\n        <div class=\"column col-auto\" *ngIf=\"ep.imageId\">\n          <figure class=\"avatar avatar-lg\">\n            <img\n              src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n                ep.imageId\n              }}.png\"\n            />\n          </figure>\n        </div>\n        <div class=\"column\">\n          <h4 class=\"mb-1\">{{ ep.name }}</h4>\n          <span class=\"text-gray\">{{ ep.description | truncate: 120 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-settings/campaign-settings.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/campaign-settings.component.ts ***!
  \***************************************************************************/
/*! exports provided: CampaignSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignSettingsComponent", function() { return CampaignSettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CampaignSettingsComponent = /** @class */ (function () {
    function CampaignSettingsComponent(campaignService, router, route, login) {
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
        this.login = login;
        this.saving = false;
        this.expandXPTable = false;
    }
    CampaignSettingsComponent.prototype.ngOnInit = function () {
        this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({});
        this.expandXPTable = !this.editing;
        if (this.campaign.experienceTable === undefined ||
            this.campaign.experienceTable === null) {
            this.campaign.experienceTable = [];
        }
    };
    CampaignSettingsComponent.prototype.selectEntityPreset = function (preset) {
        this.router.navigate(['../', 'entities', preset.id, 'edit'], {
            relativeTo: this.route,
        });
    };
    CampaignSettingsComponent.prototype.createEntityPreset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['..', 'entities', 'create'], {
                    relativeTo: this.route,
                });
                return [2 /*return*/];
            });
        });
    };
    CampaignSettingsComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var v, err_1, v, c, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.saving = true;
                        if (!this.editing) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        v = this.formGroup.value;
                        return [4 /*yield*/, this.campaignService.updateCampaign({
                                name: v.name,
                                description: v.description,
                                imageId: v.imageId,
                                experienceTable: v.experienceTable,
                                userId: this.login.id,
                                id: this.campaign.id,
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('SAVE ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        v = this.formGroup.value;
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.campaignService.createCampaign({
                                name: v.name,
                                description: v.description,
                                imageId: v.imageId,
                                experienceTable: v.experienceTable,
                                userId: this.login.id,
                                id: '',
                            })];
                    case 7:
                        c = _a.sent();
                        this.router.navigate(['campaign', 'manage', c.id, 'settings']);
                        console.log('CREATE', c);
                        return [3 /*break*/, 9];
                    case 8:
                        err_2 = _a.sent();
                        console.log('CREATE ERR', err_2, err_2.stack);
                        return [3 /*break*/, 9];
                    case 9:
                        this.saving = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CampaignSettingsComponent.prototype, "campaign", {
        get: function () {
            if (this.editing) {
                return this.campaignService.campaign;
            }
            else {
                return {
                    id: '',
                    name: '',
                    description: '',
                    imageId: '',
                    userId: '',
                    experienceTable: [],
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignSettingsComponent.prototype, "editing", {
        get: function () {
            return this.route.snapshot.data.editing;
        },
        enumerable: true,
        configurable: true
    });
    CampaignSettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-campaign-settings',
            template: __webpack_require__(/*! ./campaign-settings.component.html */ "./src/app/campaign/campaign-settings/campaign-settings.component.html"),
            styles: [__webpack_require__(/*! ./campaign-settings.component.css */ "./src/app/campaign/campaign-settings/campaign-settings.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_2__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_login_service__WEBPACK_IMPORTED_MODULE_4__["LoginService"]])
    ], CampaignSettingsComponent);
    return CampaignSettingsComponent;
}());



/***/ }),

/***/ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/entity-types/entity-types.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/entity-types/entity-types.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-entity-attribute-row-editor></dd-entity-attribute-row-editor>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/entity-types/entity-types.component.ts ***!
  \***********************************************************************************/
/*! exports provided: EntityTypesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityTypesComponent", function() { return EntityTypesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EntityTypesComponent = /** @class */ (function () {
    function EntityTypesComponent() {
    }
    EntityTypesComponent.prototype.ngOnInit = function () {
    };
    EntityTypesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-types',
            template: __webpack_require__(/*! ./entity-types.component.html */ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.html"),
            styles: [__webpack_require__(/*! ./entity-types.component.css */ "./src/app/campaign/campaign-settings/entity-types/entity-types.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EntityTypesComponent);
    return EntityTypesComponent;
}());



/***/ }),

/***/ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-horizontal\" [formGroup]=\"formGroup\">\n  <div class=\"form-group\">\n    <div class=\"col-1 col-lg-2 col-sm-12\">\n      <label class=\"form-label text-bold\">Level 1</label>\n    </div>\n    <div class=\"col-11 col-lg-10 col-sm-12\">\n      <input class=\"form-input\" type=\"number\" value=\"0\" disabled />\n    </div>\n  </div>\n  <div\n    class=\"form-group\"\n    *ngFor=\"let c of controls; let i = index\"\n    formArrayName=\"experienceTable\"\n    [ngClass]=\"{\n      'has-error':\n        hasOrderError(i) ||\n        (controls[i].invalid && (controls[i].dirty || controls[i].touched))\n    }\"\n  >\n    <div class=\"col-1 col-lg-2 col-sm-12\">\n      <label class=\"form-label text-bold\">Level {{ i + 2 }}</label>\n    </div>\n    <div class=\"col-11 col-lg-10 col-sm-12\">\n      <input\n        class=\"form-input\"\n        type=\"number\"\n        placeholder=\"XP\"\n        [formControlName]=\"i\"\n      />\n      <p class=\"form-input-hint\" *ngIf=\"hasOrderError(i)\">\n        XP value must be more than the previous level\n      </p>\n      <p\n        class=\"form-input-hint\"\n        *ngIf=\"\n          controls[i].invalid &&\n          (controls[i].dirty || controls[i].touched) &&\n          controls[i].errors.required\n        \"\n      >\n        XP value is required\n      </p>\n      <p\n        class=\"form-input-hint\"\n        *ngIf=\"\n          controls[i].invalid &&\n          (controls[i].dirty || controls[i].touched) &&\n          controls[i].errors.min\n        \"\n      >\n        XP value must be more than 0\n      </p>\n      <p\n        class=\"form-input-hint\"\n        *ngIf=\"\n          controls[i].invalid &&\n          (controls[i].dirty || controls[i].touched) &&\n          controls[i].errors.max\n        \"\n      >\n        The max xp value is 2,147,483,647\n      </p>\n    </div>\n  </div>\n</div>\n<button class=\"btn btn-sm\" (click)=\"addRow()\">\n  <i class=\"icon icon-plus\"></i> Add Level\n</button>\n<button\n  class=\"btn btn-sm btn-error ml-2\"\n  (click)=\"removeRow()\"\n  [disabled]=\"controls.length === 0\"\n>\n  <i class=\"icon icon-cross\"></i> Remove Level\n</button>\n"

/***/ }),

/***/ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: ExperienceTableEditorComponent, xpTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperienceTableEditorComponent", function() { return ExperienceTableEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xpTest", function() { return xpTest; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ExperienceTableEditorComponent = /** @class */ (function () {
    function ExperienceTableEditorComponent() {
    }
    ExperienceTableEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.campaign) {
            throw new Error('The param campaign is required!');
        }
        this.formGroup.addControl('experienceTable', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"](this.campaign.experienceTable.map(function (xp) { return _this.createRow(xp); }), xpTest));
    };
    ExperienceTableEditorComponent.prototype.createRow = function (xp) {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](xp ? xp : 0, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0),
            src_app_entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_2__["numberValidator"],
        ]);
    };
    ExperienceTableEditorComponent.prototype.addRow = function () {
        this.formArray.push(this.createRow());
    };
    ExperienceTableEditorComponent.prototype.removeRow = function () {
        this.formArray.removeAt(this.controls.length - 1);
    };
    ExperienceTableEditorComponent.prototype.hasOrderError = function (i) {
        return this.formArray.errors && this.formArray.errors["order-" + i];
    };
    Object.defineProperty(ExperienceTableEditorComponent.prototype, "formArray", {
        get: function () {
            return this.formGroup.get('experienceTable');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExperienceTableEditorComponent.prototype, "controls", {
        get: function () {
            return this.formArray.controls;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ExperienceTableEditorComponent.prototype, "campaign", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], ExperienceTableEditorComponent.prototype, "formGroup", void 0);
    ExperienceTableEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-experience-table-editor',
            template: __webpack_require__(/*! ./experience-table-editor.component.html */ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.html"),
            styles: [__webpack_require__(/*! ./experience-table-editor.component.css */ "./src/app/campaign/campaign-settings/experience-table-editor/experience-table-editor.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], ExperienceTableEditorComponent);
    return ExperienceTableEditorComponent;
}());

var xpTest = function (control) {
    var lastXP = 0;
    var errObj = {};
    for (var i = 0; i < control.value.length; i++) {
        if (!control.value[i]) {
            continue;
        }
        if (control.value[i] > lastXP) {
            lastXP = control.value[i];
        }
        else {
            errObj["order-" + i] = true;
        }
    }
    if (Object.keys(errObj).length > 0) {
        return errObj;
    }
    else {
        return null;
    }
};


/***/ }),

/***/ "./src/app/campaign/invite-manager/invite-manager.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/campaign/invite-manager/invite-manager.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/campaign/invite-manager/invite-manager.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/campaign/invite-manager/invite-manager.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading\" *ngIf=\"loading\"></div>\n<div *ngIf=\"invites\">\n  <!-- Empty State -->\n  <div class=\"empty\" *ngIf=\"invites.length === 0\">\n    <div class=\"empty-icon\"><i class=\"icon icon-people icon-4x\"></i></div>\n    <p class=\"empty-title h5\">There are no invites</p>\n    <p class=\"empty-subtitle\">Click the button below to create one</p>\n    <div class=\"empty-action\">\n      <button\n        class=\"btn btn-primary\"\n        [ngClass]=\"{ loading: creatingInvite }\"\n        (click)=\"createInvite()\"\n      >\n        Create invite\n      </button>\n    </div>\n  </div>\n\n  <button\n    class=\"btn btn-sm\"\n    (click)=\"createInvite()\"\n    [ngClass]=\"{ loading: creatingInvite }\"\n  >\n    <i class=\"icon icon-plus\"></i> Create Invite\n  </button>\n  <!-- Invites List -->\n  <table class=\"table\" *ngIf=\"invites.length > 0\">\n    <thead>\n      <tr>\n        <th>Link</th>\n        <th>Name</th>\n        <th>Status</th>\n        <th>User</th>\n        <th>Created On</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let i of invites\">\n        <td><a [href]=\"getInviteLink(i.id)\">Link</a></td>\n        <td>{{ i.name }}</td>\n        <td [ngSwitch]=\"i.status\">\n          <span *ngSwitchCase=\"0\">Pending</span>\n          <span *ngSwitchCase=\"1\">Revoked</span>\n          <span *ngSwitchCase=\"2\">Accepted</span>\n          <span *ngSwitchCase=\"3\">Declined</span>\n        </td>\n        <td>\n          <div *ngIf=\"i.user\">\n            <figure class=\"avatar avatar-xs\">\n              <img [src]=\"i.user.pictureURL\" alt=\"Avatar\" />\n            </figure>\n            {{ i.user.username }}\n          </div>\n          <span *ngIf=\"!i.user\">N/A</span>\n        </td>\n        <td>{{ i.createdAt | date }}</td>\n        <td>\n          <button\n            class=\"btn btn-link btn-sm\"\n            *ngIf=\"i.status === 0\"\n            (click)=\"revokeInvite(i)\"\n          >\n            <i class=\"icon icon-cross\"></i>Revoke\n          </button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/campaign/invite-manager/invite-manager.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/campaign/invite-manager/invite-manager.component.ts ***!
  \*********************************************************************/
/*! exports provided: InviteManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteManagerComponent", function() { return InviteManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var chance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chance */ "./node_modules/chance/chance.js");
/* harmony import */ var chance__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chance__WEBPACK_IMPORTED_MODULE_2__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var InviteManagerComponent = /** @class */ (function () {
    function InviteManagerComponent(campaignService) {
        this.campaignService = campaignService;
        this.loading = false;
        this.creatingInvite = false;
    }
    InviteManagerComponent.prototype.ngOnInit = function () {
        this.loadInvites();
    };
    InviteManagerComponent.prototype.createInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var c, invite, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.creatingInvite = true;
                        c = new chance__WEBPACK_IMPORTED_MODULE_2__["Chance"]();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.campaignService.createInvite(c.state({ full: true, territories: true }) + " " + c.animal())];
                    case 2:
                        invite = _a.sent();
                        this.invites.push(invite);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('INVITE ERRR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.creatingInvite = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteManagerComponent.prototype.revokeInvite = function (invite) {
        return __awaiter(this, void 0, void 0, function () {
            var toUpdate, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        toUpdate = __assign({}, invite, { status: src_app_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignInviteStatus"].REVOKED });
                        return [4 /*yield*/, this.campaignService.updateInvite(toUpdate)];
                    case 1:
                        _a.sent();
                        invite.status = toUpdate.status;
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log('REVOKE ERR', err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InviteManagerComponent.prototype.getInviteLink = function (id) {
        return location.protocol + "//" + location.host + "/invite/" + id;
    };
    InviteManagerComponent.prototype.loadInvites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var invites, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.campaignService.getInvites()];
                    case 2:
                        invites = _a.sent();
                        this.invites = invites;
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log('LOAD ERR', err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-invite-manager',
            template: __webpack_require__(/*! ./invite-manager.component.html */ "./src/app/campaign/invite-manager/invite-manager.component.html"),
            styles: [__webpack_require__(/*! ./invite-manager.component.css */ "./src/app/campaign/invite-manager/invite-manager.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"]])
    ], InviteManagerComponent);
    return InviteManagerComponent;
}());



/***/ }),

/***/ "./src/app/confirmation-modal/confirmation-modal.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/confirmation-modal/confirmation-modal.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/confirmation-modal/confirmation-modal.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/confirmation-modal/confirmation-modal.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-modal size=\"small\" #modal>\n  <div modal-header>\n    <h5 class=\"modal-title h5\">{{ title }}</h5>\n  </div>\n  <div modal-body>{{ question }}</div>\n  <div modal-footer>\n    <button class=\"btn mr-2\" (click)=\"confirm()\">Yes</button>\n    <button class=\"btn btn-primary\" (click)=\"deny()\">No</button>\n  </div>\n</dd-modal>\n"

/***/ }),

/***/ "./src/app/confirmation-modal/confirmation-modal.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/confirmation-modal/confirmation-modal.component.ts ***!
  \********************************************************************/
/*! exports provided: ConfirmationModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmationModalComponent", function() { return ConfirmationModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _modal_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal/modal.component */ "./src/app/modal/modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var ConfirmationModalComponent = /** @class */ (function () {
    function ConfirmationModalComponent() {
    }
    ConfirmationModalComponent.prototype.ngOnInit = function () { };
    ConfirmationModalComponent.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modal.close(false)];
            });
        });
    };
    ConfirmationModalComponent.prototype.confirm = function () {
        return this.modal.close(true);
    };
    ConfirmationModalComponent.prototype.deny = function () {
        return this.modal.close(false);
    };
    ConfirmationModalComponent.prototype.getConfirmation = function (question, title) {
        if (question === void 0) { question = 'Are you sure?'; }
        if (title === void 0) { title = 'Confirm'; }
        this.title = title;
        this.question = question;
        return this.modal.open();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal'),
        __metadata("design:type", _modal_modal_component__WEBPACK_IMPORTED_MODULE_1__["ModalComponent"])
    ], ConfirmationModalComponent.prototype, "modal", void 0);
    ConfirmationModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-confirmation-modal',
            template: __webpack_require__(/*! ./confirmation-modal.component.html */ "./src/app/confirmation-modal/confirmation-modal.component.html"),
            styles: [__webpack_require__(/*! ./confirmation-modal.component.css */ "./src/app/confirmation-modal/confirmation-modal.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], ConfirmationModalComponent);
    return ConfirmationModalComponent;
}());



/***/ }),

/***/ "./src/app/entity.service.ts":
/*!***********************************!*\
  !*** ./src/app/entity.service.ts ***!
  \***********************************/
/*! exports provided: EntityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityService", function() { return EntityService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var EntityService = /** @class */ (function () {
    function EntityService(http) {
        this.http = http;
    }
    EntityService.prototype.updateEntityPreset = function (entityPreset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entitypresets/" + entityPreset.id, entityPreset)
                        .toPromise()];
            });
        });
    };
    // Creates a blank entity preset and returns the ID
    EntityService.prototype.createEntityPreset = function (preset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entitypresets", preset)
                        .toPromise()];
            });
        });
    };
    EntityService.prototype.getEntityPreset = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entitypresets/" + id)
                        .toPromise()];
            });
        });
    };
    EntityService.prototype.deleteEntityPreset = function (campaignId, entityPresetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulateDelay(250)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityService.prototype.getEntity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entities/" + id)
                        .toPromise()];
            });
        });
    };
    EntityService.prototype.createEntity = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entities", entity)
                        .toPromise()];
            });
        });
    };
    EntityService.prototype.updateEntity = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http
                        .put(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/entities/" + entity.id, entity)
                        .toPromise()];
            });
        });
    };
    EntityService.prototype.deleteEntity = function (campaignId, entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulateDelay(250)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EntityService);
    return EntityService;
}());

// Used in mock apis, will be removed
var simulateDelay = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};


/***/ }),

/***/ "./src/app/entity.ts":
/*!***************************!*\
  !*** ./src/app/entity.ts ***!
  \***************************/
/*! exports provided: AttributeClass, HealthMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeClass", function() { return AttributeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthMode", function() { return HealthMode; });
var AttributeClass;
(function (AttributeClass) {
    AttributeClass[AttributeClass["MAJOR"] = 0] = "MAJOR";
    AttributeClass[AttributeClass["NORMAL"] = 1] = "NORMAL";
    AttributeClass[AttributeClass["MINOR"] = 2] = "MINOR";
    AttributeClass[AttributeClass["UNIMPORTANT"] = 3] = "UNIMPORTANT";
})(AttributeClass || (AttributeClass = {}));
var HealthMode;
(function (HealthMode) {
    HealthMode[HealthMode["NORMAL"] = 0] = "NORMAL";
    HealthMode[HealthMode["MULTI_BAR"] = 1] = "MULTI_BAR";
})(HealthMode || (HealthMode = {}));


/***/ }),

/***/ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"formGroup\">\n  <div class=\"form-horizontal\">\n    <div\n      class=\"form-group col-12\"\n      *ngFor=\"let att of attributes\"\n      [ngClass]=\"{\n        'has-error': control(att.name).invalid && (control(att.name).dirty || control(att.name).touched),\n        'has-success': control(att.name).valid && (control(att.name).dirty || control(att.name).touched)\n      }\"\n    >\n      <div class=\"col-1 col-lg-2 col-sm-12\">\n        <label class=\"form-label\"\n          >{{ att.name }} <span *ngIf=\"att.required\" class=\"text-primary text-large text-bold\">*</span></label\n        >\n      </div>\n      <div class=\"col-11 col-lg-10 col-sm-12\">\n        <div [ngClass]=\"{ 'has-icon-left': att.imageId }\" [ngSwitch]=\"att.type\">\n          <!-- Text Input -->\n          <input\n            type=\"text\"\n            name=\"attr\"\n            class=\"form-input\"\n            [placeholder]=\"att.name\"\n            [formControlName]=\"att.name\"\n            *ngSwitchCase=\"0\"\n          />\n\n          <!-- Number Input -->\n          <input\n            type=\"number\"\n            name=\"attr\"\n            class=\"form-input\"\n            [placeholder]=\"att.name\"\n            [formControlName]=\"att.name\"\n            *ngSwitchCase=\"1\"\n          />\n\n          <!-- Enum input -->\n          <select class=\"form-input\" name=\"attr\" [formControlName]=\"att.name\" *ngSwitchCase=\"2\">\n            <option *ngFor=\"let o of att.options\" [value]=\"o\">{{ o }}</option>\n          </select>\n\n          <figure class=\"form-icon avatar\" *ngIf=\"att.imageId\">\n            <img src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{ att.imageId }}.png\" />\n          </figure>\n        </div>\n        <p class=\"form-input-hint mb-0\">{{ att.description }}</p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"\n            control(att.name).invalid &&\n            (control(att.name).dirty || control(att.name).touched) &&\n            control(att.name).errors.required\n          \"\n        >\n          {{ att.name }} is required\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"\n            control(att.name).invalid &&\n            (control(att.name).dirty || control(att.name).touched) &&\n            control(att.name).errors.min\n          \"\n        >\n          {{ att.name }} can't be lower than {{ att.min }}\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"\n            control(att.name).invalid &&\n            (control(att.name).dirty || control(att.name).touched) &&\n            control(att.name).errors.max\n          \"\n        >\n          {{ att.name }} can't be higher than {{ att.max }}\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"\n            control(att.name).invalid &&\n            (control(att.name).dirty || control(att.name).touched) &&\n            control(att.name).errors.minlength\n          \"\n        >\n          {{ att.name }} cannot have less than {{ att.min }} characters\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"\n            control(att.name).invalid &&\n            (control(att.name).dirty || control(att.name).touched) &&\n            control(att.name).errors.maxlength\n          \"\n        >\n          {{ att.name }} cannot have more than {{ att.max }} characters\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts ***!
  \***********************************************************************************/
/*! exports provided: DynamicAttributeFormComponent, numberValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicAttributeFormComponent", function() { return DynamicAttributeFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberValidator", function() { return numberValidator; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/attributes */ "./src/app/attributes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicAttributeFormComponent = /** @class */ (function () {
    function DynamicAttributeFormComponent() {
    }
    DynamicAttributeFormComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attr = _a[_i];
            var validators = [];
            if (attr.type === src_app_attributes__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].STRING) {
                if (attr.min !== undefined && attr.min !== null) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(attr.min));
                }
                if (attr.max !== undefined && attr.max !== null) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(attr.max));
                }
            }
            else if (attr.type === src_app_attributes__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].NUMBER) {
                if (attr.min !== undefined && attr.min !== null) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(attr.min));
                }
                if (attr.max !== undefined && attr.max !== null) {
                    validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].max(attr.max));
                }
                validators.push(numberValidator);
            }
            if (attr.required) {
                validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            }
            if (attr.type === src_app_attributes__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].ENUM && attr.defaultValue === undefined) {
                this.formGroup.addControl(attr.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](attr.options[0], validators));
            }
            else {
                this.formGroup.addControl(attr.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](attr.defaultValue, validators));
            }
        }
        // this.formGroup.valueChanges.subscribe((v) => {
        //   console.log(v, this.formGroup);
        // });
    };
    DynamicAttributeFormComponent.prototype.constructAttributes = function () {
        var attributes = [];
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attr = _a[_i];
            attributes.push({
                name: attr.name,
                type: attr.type,
                data: this.formGroup.get(attr.name).value,
            });
        }
        return attributes;
    };
    DynamicAttributeFormComponent.prototype.control = function (name) {
        return this.formGroup.get(name);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], DynamicAttributeFormComponent.prototype, "attributes", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], DynamicAttributeFormComponent.prototype, "formGroup", void 0);
    DynamicAttributeFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-dynamic-attribute-form',
            template: __webpack_require__(/*! ./dynamic-attribute-form.component.html */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-attribute-form.component.css */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], DynamicAttributeFormComponent);
    return DynamicAttributeFormComponent;
}());

var numberValidator = function (control) {
    if (control.value !== null &&
        control.value !== undefined &&
        control.value !== '') {
        try {
            parseFloat(control.value);
        }
        catch (err) {
            return {
                number: true,
            };
        }
    }
};


/***/ }),

/***/ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"formGroup\" class=\"mb-2\">\n  <div class=\"columns\">\n    <div class=\"column\">\n      <h3 class=\"mb-0\">{{ formGroup.get('name').value }}</h3>\n    </div>\n    <div class=\"column col-auto col-ml-auto\">\n      <button class=\"btn btn-error btn-sm\" (click)=\"remove.emit()\">\n        Remove {{ formGroup.get('name').value }} <i class=\"icon icon-cross\"></i>\n      </button>\n    </div>\n  </div>\n  <div class=\"columns\">\n    <div class=\"column col-auto\">\n      <label class=\"form-label\">Icon</label>\n      <dd-image-upload [formGroup]=\"formGroup\" [eleId]=\"id\"></dd-image-upload>\n\n      <div class=\"form-group\">\n        <label for=\"type\" class=\"form-label\">Type</label>\n        <select class=\"form-input\" name=\"type\" id=\"type\" formControlName=\"type\">\n          <option value=\"0\">Word</option>\n          <option value=\"1\">Number</option>\n          <option value=\"2\">Selection</option>\n        </select>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"class\" class=\"form-label\">Class</label>\n        <select\n          name=\"class\"\n          id=\"class\"\n          class=\"form-input\"\n          formControlName=\"class\"\n        >\n          <option value=\"0\">Major</option>\n          <option value=\"1\">Normal</option>\n          <option value=\"2\">Minor</option>\n          <option value=\"3\">Unimportant</option>\n        </select>\n      </div>\n    </div>\n\n    <!-- Name -->\n    <div class=\"column\">\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{ 'has-error': name.invalid && name.dirty }\"\n      >\n        <label for=\"name\" class=\"form-label\">Name</label>\n        <input\n          class=\"form-input\"\n          formControlName=\"name\"\n          type=\"text\"\n          name=\"name\"\n          id=\"name\"\n          placeholder=\"Name\"\n        />\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.dirty && name.errors.required\"\n        >\n          This attribute needs a name\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.dirty && name.errors.maxlength\"\n        >\n          Attribute names must be below 20 characters in length\n        </p>\n      </div>\n\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{ 'has-error': description.invalid && description.dirty }\"\n      >\n        <label for=\"description\" class=\"form-label\">Description</label>\n        <textarea\n          name=\"description\"\n          id=\"description\"\n          class=\"form-input\"\n          placeholder=\"Description\"\n          formControlName=\"description\"\n          rows=\"3\"\n        ></textarea>\n      </div>\n\n      <div class=\"form-group\" *ngIf=\"type.value === '2'\">\n        <label for=\"options\" class=\"form-label\">Options</label>\n        <input\n          class=\"form-input\"\n          type=\"text\"\n          name=\"options\"\n          formControlName=\"options\"\n          id=\"options\"\n          placeholder=\"Big, Medium, Small\"\n        />\n        <p class=\"form-input-hint mb-1\">\n          Comma separated list of possible values the user can choose from\n        </p>\n        <div>\n          <div class=\"chip bg-primary\" *ngFor=\"let o of optionsList\">\n            {{ o }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"columns\">\n        <div class=\"column col-auto\">\n          <div class=\"form-group\">\n            <label class=\"form-checkbox\">\n              <input\n                type=\"checkbox\"\n                name=\"required\"\n                formControlName=\"required\"\n              />\n              <i class=\"form-icon\"></i> Required attribute\n            </label>\n          </div>\n        </div>\n\n        <div class=\"column\">\n          <div class=\"form-group\">\n            <label class=\"form-checkbox\">\n              <input\n                type=\"checkbox\"\n                name=\"required\"\n                [formControl]=\"minControl\"\n              />\n              <i class=\"form-icon\"></i> Validate minimum\n            </label>\n          </div>\n\n          <div class=\"form-group\" *ngIf=\"validateMin\">\n            <label for=\"min\" class=\"form-label\">Minimum</label>\n            <input\n              class=\"form-input\"\n              type=\"number\"\n              name=\"min\"\n              id=\"min\"\n              formControlName=\"min\"\n            />\n            <p class=\"form-input-hint\">\n              If the attribute type is word, this will validate the minimum\n              number of characters in the word. If it is a number, this will be\n              the smallest amount\n            </p>\n          </div>\n        </div>\n\n        <div class=\"column\">\n          <div class=\"form-group\">\n            <label class=\"form-checkbox\">\n              <input\n                type=\"checkbox\"\n                name=\"required\"\n                [formControl]=\"maxControl\"\n              />\n              <i class=\"form-icon\"></i> Validate maximum\n            </label>\n          </div>\n\n          <div class=\"form-group\" *ngIf=\"validateMax\">\n            <label for=\"max\" class=\"form-label\">Maximum</label>\n            <input\n              class=\"form-input\"\n              type=\"number\"\n              name=\"max\"\n              id=\"max\"\n              formControlName=\"max\"\n            />\n            <p class=\"form-input-hint\">\n              If the attribute type is word, this will validate the maximum\n              number of characters in the word (up to 255). If it is a number,\n              this will be the largest amount\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: EntityAttributeRowEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityAttributeRowEditorComponent", function() { return EntityAttributeRowEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntityAttributeRowEditorComponent = /** @class */ (function () {
    function EntityAttributeRowEditorComponent() {
        this.validateMin = false;
        this.validateMax = false;
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EntityAttributeRowEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.minControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false);
        this.maxControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false);
        this.minControl.valueChanges.subscribe(function (v) {
            _this.validateMin = v;
        });
        this.maxControl.valueChanges.subscribe(function (v) {
            _this.validateMax = v;
        });
        this.formGroup.valueChanges.subscribe(function (v) {
            if (_this.formGroup.value.min !== undefined &&
                _this.formGroup.value.min !== null) {
                _this.minControl.setValue(true);
            }
            if (_this.formGroup.value.max !== undefined &&
                _this.formGroup.value.max !== null) {
                _this.maxControl.setValue(true);
            }
        });
        // this should mean that the form group is empty
        if (!this.formGroup.contains('name')) {
            this.formGroup.addControl('name', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(20),
            ]));
            this.formGroup.addControl('description', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]));
            this.formGroup.addControl('class', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('1', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]));
            this.formGroup.addControl('type', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('0', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]));
            this.formGroup.addControl('required', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]));
            this.formGroup.addControl('min', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_2__["numberValidator"]]));
            this.formGroup.addControl('max', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_2__["numberValidator"]]));
            this.formGroup.addControl('options', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/([A-Za-z0-9._]+)/gi)]));
            this.formGroup.addControl('imageId', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null));
        }
    };
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "description", {
        get: function () {
            return this.formGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "type", {
        get: function () {
            return this.formGroup.get('type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "required", {
        get: function () {
            return this.formGroup.get('required');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "min", {
        get: function () {
            return this.formGroup.get('min');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "max", {
        get: function () {
            return this.formGroup.get('max');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "options", {
        get: function () {
            return this.formGroup.get('options');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "optionsList", {
        get: function () {
            if (this.options.value) {
                return this.options.value
                    .split(',')
                    .map(function (o) { return o.trim(); })
                    .filter(function (o) { return o.length > 0; });
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityAttributeRowEditorComponent.prototype, "id", {
        get: function () {
            return this.formGroup.parent.controls.indexOf(this.formGroup);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EntityAttributeRowEditorComponent.prototype, "remove", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], EntityAttributeRowEditorComponent.prototype, "formGroup", void 0);
    EntityAttributeRowEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-attribute-row-editor',
            template: __webpack_require__(/*! ./entity-attribute-row-editor.component.html */ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.html"),
            styles: [__webpack_require__(/*! ./entity-attribute-row-editor.component.css */ "./src/app/entity/entity-attribute-row-editor/entity-attribute-row-editor.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], EntityAttributeRowEditorComponent);
    return EntityAttributeRowEditorComponent;
}());



/***/ }),

/***/ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <!-- Loader -->\n  <div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n\n  <div class=\"columns\" *ngIf=\"entity !== undefined || !editing\">\n    <div class=\"column\">\n      <h3>Edit {{ preset.name }}</h3>\n    </div>\n    <div class=\"column col-auto col-ml-auto\">\n      <a class=\"btn mr-2\" [routerLink]=\"['..']\">Cancel</a>\n\n      <button\n        class=\"btn btn-primary\"\n        (click)=\"save()\"\n        [ngClass]=\"{ loading: saving }\"\n        [disabled]=\"formGroup.invalid || attributesFormGroup.invalid\"\n      >\n        Save\n      </button>\n    </div>\n  </div>\n  <!-- Form -->\n  <div [formGroup]=\"formGroup\" *ngIf=\"entity !== undefined || !editing\">\n    <div class=\"columns\">\n      <div class=\"column col-auto\">\n        <dd-image-upload [formGroup]=\"formGroup\"></dd-image-upload>\n\n        <div\n          class=\"form-group\"\n          [ngClass]=\"{\n            'has-error': xp.invalid && (xp.touched || xp.dirty),\n            'has-success': xp.valid && (xp.touched || xp.dirty)\n          }\"\n        >\n          <label for=\"xp\" class=\"form-label\"\n            >XP <span class=\"text-large text-bold text-primary\">*</span></label\n          >\n          <input\n            type=\"number\"\n            name=\"xp\"\n            id=\"xp\"\n            class=\"form-input\"\n            placeholder=\"XP\"\n            formControlName=\"xp\"\n          />\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"xp.invalid && (xp.touched || xp.dirty) && xp.errors.required\"\n          >\n            An XP value is required\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"xp.invalid && (xp.touched || xp.dirty) && xp.errors.min\"\n          >\n            XP must be more than 0\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"xp.invalid && (xp.touched || xp.dirty) && xp.errors.max\"\n          >\n            Too many XP!!\n          </p>\n        </div>\n      </div>\n\n      <!-- Standard form inputs -->\n      <div class=\"column\">\n        <!-- Name -->\n        <div\n          class=\"form-group\"\n          [ngClass]=\"{\n            'has-error': name.invalid && (name.touched || name.dirty),\n            'has-success': name.valid && (name.touched || name.dirty)\n          }\"\n        >\n          <label for=\"name\" class=\"form-lable\"\n            >Name\n            <span class=\"text-large text-bold text-primary\">*</span></label\n          >\n          <input\n            type=\"text\"\n            name=\"name\"\n            id=\"name\"\n            formControlName=\"name\"\n            class=\"form-input\"\n            placeholder=\"Name\"\n          />\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"\n              name.invalid &&\n              (name.touched || name.dirty) &&\n              name.errors.required\n            \"\n          >\n            A name is required\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"\n              name.invalid &&\n              (name.touched || name.dirty) &&\n              name.errors.minlength\n            \"\n          >\n            The name can't be shorter than 2 characters\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"\n              name.invalid &&\n              (name.touched || name.dirty) &&\n              name.errors.maxlength\n            \"\n          >\n            The name can't be longer than 30 characters\n          </p>\n        </div>\n\n        <!-- Description -->\n        <div\n          class=\"form-group\"\n          [ngClass]=\"{\n            'has-error':\n              description.invalid && (description.touched || description.dirty),\n            'has-success':\n              description.valid && (description.touched || description.dirty)\n          }\"\n        >\n          <label for=\"description\" class=\"form-label\"\n            >Description\n            <span class=\"text-large text-bold text-primary\">*</span></label\n          >\n          <textarea\n            name=\"description\"\n            id=\"description\"\n            formControlName=\"description\"\n            rows=\"5\"\n            class=\"form-input\"\n            placeholder=\"Description\"\n          ></textarea>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"\n              description.invalid &&\n              (description.touched || description.dirty) &&\n              description.errors.minlength\n            \"\n          >\n            The description can't be shorter than 3 characters\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"\n              description.invalid &&\n              (description.touched || description.dirty) &&\n              description.errors.required\n            \"\n          >\n            The description is required\n          </p>\n        </div>\n      </div>\n    </div>\n\n    <h3 class=\"mt-2\">Custom Attributes</h3>\n    <dd-dynamic-attribute-form\n      [formGroup]=\"attributesFormGroup\"\n      [attributes]=\"preset.attributes\"\n    ></dd-dynamic-attribute-form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: EntityCreationFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityCreationFormComponent", function() { return EntityCreationFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_entity_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/entity.service */ "./src/app/entity.service.ts");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
/* harmony import */ var src_app_login_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var EntityCreationFormComponent = /** @class */ (function () {
    function EntityCreationFormComponent(route, router, entityService, campaignService, login) {
        this.route = route;
        this.router = router;
        this.entityService = entityService;
        this.campaignService = campaignService;
        this.login = login;
        this.loading = false;
        this.saving = false;
    }
    EntityCreationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('ent_id');
            if (_this.editing) {
                _this.loadEntity(id);
            }
        });
        this.attributesFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({});
        this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(30),
            ]),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3),
            ]),
            xp: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_5__["numberValidator"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(2147483647),
            ]),
            imageId: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('uncertainty'),
        });
        // this.formGroup.valueChanges.subscribe((v) =>
        //   console.log(v, this.formGroup)
        // );
    };
    EntityCreationFormComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, ent, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.saving = true;
                        this.formGroup.disable();
                        this.attributesFormGroup.disable();
                        if (!this.editing) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityService.updateEntity(this.constructEntity())];
                    case 2:
                        _a.sent();
                        this.router.navigate(['../'], { relativeTo: this.route });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('SAVE ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.entityService.createEntity(this.constructEntity())];
                    case 6:
                        ent = _a.sent();
                        this.router.navigate([
                            'campaigns',
                            this.campaignService.campaign.id,
                            'entities',
                            ent.id,
                        ]);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        console.log('Create ERR', err_2);
                        return [3 /*break*/, 8];
                    case 8:
                        this.formGroup.enable();
                        this.attributesFormGroup.enable();
                        this.saving = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityCreationFormComponent.prototype.constructEntity = function () {
        var v = this.formGroup.value;
        var ent = {
            name: v.name,
            description: v.description,
            xp: v.xp,
            imageId: v.imageId,
            userId: this.login.id,
            campaignId: this.campaignService.campaign.id,
            entityPresetId: this.preset.id,
            attributes: [],
        };
        var _loop_1 = function (k, v_1) {
            var preset = this_1.preset.attributes.find(function (p) { return p.name === k; });
            ent.attributes.push({
                name: preset.name,
                data: v_1,
                type: preset.type,
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(this.attributesFormGroup.value); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v_1 = _b[1];
            _loop_1(k, v_1);
        }
        return ent;
    };
    EntityCreationFormComponent.prototype.loadEntity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ent_1, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityService.getEntity(id)];
                    case 2:
                        ent_1 = _a.sent();
                        this.entity = ent_1;
                        setTimeout(function () {
                            _this.formGroup.patchValue(ent_1);
                            for (var _i = 0, _a = ent_1.attributes; _i < _a.length; _i++) {
                                var attr = _a[_i];
                                if (_this.attributesFormGroup.get(attr.name)) {
                                    _this.attributesFormGroup.get(attr.name).setValue(attr.data);
                                }
                            }
                        }, 1);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log('LOAD ERR', err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(EntityCreationFormComponent.prototype, "preset", {
        get: function () {
            var _this = this;
            if (this.editing) {
                return this.entity.preset;
            }
            else {
                return this.campaignService.campaign.entityPresets.find(function (ep) { return ep.id === _this.route.snapshot.paramMap.get('ent_type_id'); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCreationFormComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCreationFormComponent.prototype, "description", {
        get: function () {
            return this.formGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCreationFormComponent.prototype, "xp", {
        get: function () {
            return this.formGroup.get('xp');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCreationFormComponent.prototype, "editing", {
        get: function () {
            return this.route.snapshot.data.editing;
        },
        enumerable: true,
        configurable: true
    });
    EntityCreationFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-creation-form',
            template: __webpack_require__(/*! ./entity-creation-form.component.html */ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.html"),
            styles: [__webpack_require__(/*! ./entity-creation-form.component.css */ "./src/app/entity/entity-form/entity-creation-form/entity-creation-form.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_entity_service__WEBPACK_IMPORTED_MODULE_3__["EntityService"],
            src_app_campaign_service__WEBPACK_IMPORTED_MODULE_4__["CampaignService"],
            src_app_login_service__WEBPACK_IMPORTED_MODULE_6__["LoginService"]])
    ], EntityCreationFormComponent);
    return EntityCreationFormComponent;
}());



/***/ }),

/***/ "./src/app/entity/entity-form/entity-form.component.css":
/*!**************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-form.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/entity/entity-form/entity-form.component.html":
/*!***************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-form.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-confirmation-modal #confirmmodal></dd-confirmation-modal>\n<div class=\"container grid-xl\" [formGroup]=\"formGroup\" *ngIf=\"entityPreset\">\n  <div class=\"columns\">\n    <div class=\"column\">\n      <h3 *ngIf=\"!editing\">Create Entity Preset</h3>\n      <h3 *ngIf=\"editing\">Edit Entity Preset</h3>\n    </div>\n    <div class=\"column col-auto col-ml-auto\">\n      <button\n        class=\"btn btn-error mr-2\"\n        (click)=\"delete()\"\n        [ngClass]=\"{ loading: deleting }\"\n      >\n        Delete\n      </button>\n      <button\n        class=\"btn\"\n        (click)=\"save()\"\n        [ngClass]=\"{ loading: saving }\"\n        [disabled]=\"formGroup.invalid\"\n      >\n        Save\n      </button>\n    </div>\n  </div>\n\n  <div class=\"columns\">\n    <!-- Image Upload -->\n    <div class=\"column col-auto\">\n      <label class=\"form-label\">Icon</label>\n      <dd-image-upload [formGroup]=\"formGroup\"></dd-image-upload>\n    </div>\n\n    <div class=\"column\">\n      <!-- Name -->\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{\n          'has-error': name.invalid && (name.dirty || name.touched)\n        }\"\n      >\n        <label for=\"name\" class=\"form-label\">Name</label>\n        <input\n          type=\"text\"\n          name=\"name\"\n          id=\"name\"\n          formControlName=\"name\"\n          class=\"form-input\"\n          placeholder=\"Name\"\n        />\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.dirty && name.errors.required\"\n        >\n          A name is required\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.dirty && name.errors.minlength\"\n        >\n          Name should not have less than 3 characters\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.dirty && name.errors.maxlength\"\n        >\n          Name should not have more than 30 characters\n        </p>\n      </div>\n\n      <!-- Description -->\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{\n          'has-error':\n            description.invalid && (description.dirty || description.touched)\n        }\"\n      >\n        <label for=\"description\" class=\"form-label\">Description</label>\n        <textarea\n          class=\"form-input\"\n          name=\"description\"\n          id=\"description\"\n          rows=\"4\"\n          formControlName=\"description\"\n          placeholder=\"Description\"\n        ></textarea>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            description.invalid &&\n            description.dirty &&\n            description.errors.required\n          \"\n        >\n          A description is required\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"\n            description.invalid &&\n            description.dirty &&\n            description.errors.minlength\n          \"\n        >\n          The description should not have less than 3 characters\n        </p>\n      </div>\n\n      <h5 class=\"mt-2\">Health</h5>\n      <!-- Health -->\n      <div formGroupName=\"health\" class=\"columns\">\n        <div class=\"column\">\n          <div class=\"form-group\">\n            <label for=\"health-mode\" class=\"form-label\">Health Mode</label>\n            <select\n              name=\"health-mode\"\n              id=\"health-mode\"\n              class=\"form-input\"\n              formControlName=\"mode\"\n            >\n              <option value=\"0\">Normal</option>\n              <option value=\"1\">Multi Bar</option>\n            </select>\n          </div>\n        </div>\n\n        <div class=\"column\">\n          <!-- Default Max -->\n          <div class=\"form-group\">\n            <label for=\"hp-max\" class=\"form-label\">Default Max HP</label>\n            <input\n              formControlName=\"max\"\n              type=\"number\"\n              name=\"hp-max\"\n              id=\"hp-max\"\n              class=\"form-input\"\n              placeholder=\"Default Max HP\"\n            />\n          </div>\n        </div>\n      </div>\n\n      <!-- <h5 class=\"mt-2\">Starting Inventory</h5>\n      <dd-inventory-selector\n        [formGroup]=\"formGroup\"\n        [entityPreset]=\"entityPreset\"\n      ></dd-inventory-selector> -->\n\n      <h5 class=\"mt-2\">Misc</h5>\n      <!-- Misc Options -->\n      <div class=\"columns\">\n        <div class=\"column\">\n          <!-- Player Creatable -->\n          <div class=\"form-group\">\n            <label class=\"form-checkbox\">\n              <input type=\"checkbox\" formControlName=\"playerCreatable\" />\n              <i class=\"form-icon\"></i> Players can create this type of entity\n            </label>\n          </div>\n        </div>\n      </div>\n\n      <!-- Attributes -->\n      <div>\n        <div class=\"columns\">\n          <div class=\"column\"><h5 class=\"mt-2\">Attributes</h5></div>\n          <div class=\"column col-auto\">\n            <button class=\"btn btn-sm\" (click)=\"addAttribute()\">\n              <i class=\"icon icon-plus\"></i> Add Attribute\n            </button>\n          </div>\n        </div>\n\n        <!-- Attribute Array -->\n        <div>\n          <dd-entity-attribute-row-editor\n            *ngFor=\"let attr of attributeControls; let i = index\"\n            (remove)=\"removeAttribute(i)\"\n            [formGroup]=\"attr\"\n          ></dd-entity-attribute-row-editor>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/entity-form/entity-form.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-form.component.ts ***!
  \*************************************************************/
/*! exports provided: EntityFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityFormComponent", function() { return EntityFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/confirmation-modal/confirmation-modal.component */ "./src/app/confirmation-modal/confirmation-modal.component.ts");
/* harmony import */ var src_app_entity_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/entity.service */ "./src/app/entity.service.ts");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
/* harmony import */ var src_app_login_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var EntityFormComponent = /** @class */ (function () {
    function EntityFormComponent(entityService, campaignService, login, router, route) {
        this.entityService = entityService;
        this.campaignService = campaignService;
        this.login = login;
        this.router = router;
        this.route = route;
        this.saving = false;
        this.deleting = false;
        this.loading = false;
    }
    EntityFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entityPreset = {
            id: '',
            name: '',
            description: '',
            userId: '',
            imageId: '',
            campaignId: '',
            playerCreatable: false,
        };
        this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30),
            ]),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
            ]),
            health: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                mode: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('0'),
                max: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0), _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_6__["numberValidator"]]),
                current: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0), _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_6__["numberValidator"]]),
            }),
            playerCreatable: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
            imageId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            attributes: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]),
        });
        this.route.params.subscribe(function (params) {
            if (params.ent_id) {
                _this.loadEntityPreset(params.ent_id);
            }
        });
    };
    EntityFormComponent.prototype.loadEntityPreset = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var preset_1, i, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        this.formGroup.disable();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityService.getEntityPreset(id)];
                    case 2:
                        preset_1 = _a.sent();
                        this.entityPreset = preset_1;
                        for (i = 0; i < preset_1.attributes.length; i++) {
                            this.addAttribute();
                        }
                        setTimeout(function () {
                            _this.formGroup.patchValue({
                                id: preset_1.id,
                                name: preset_1.name,
                                description: preset_1.description,
                                attributes: preset_1.attributes,
                                imageId: preset_1.imageId,
                                playerCreatable: preset_1.playerCreatable,
                            });
                        }, 1);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('LOAD ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        this.formGroup.enable();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityFormComponent.prototype.submit = function () { };
    EntityFormComponent.prototype.removeAttribute = function (i) {
        this.formGroup.get('attributes').removeAt(i);
    };
    EntityFormComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var v, err_2, v, ep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.formGroup.valid) return [3 /*break*/, 10];
                        this.formGroup.disable();
                        this.saving = true;
                        if (!this.editing) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        v = this.formGroup.value;
                        return [4 /*yield*/, this.entityService.updateEntityPreset({
                                id: this.entityPreset.id,
                                userId: this.login.id,
                                campaignId: this.campaignService.campaign.id,
                                name: v.name,
                                description: v.description,
                                imageId: v.imageId,
                                playerCreatable: v.playerCreatable,
                                attributes: v.attributes,
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.router.navigate(['../../..', 'settings'], {
                                relativeTo: this.route,
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        console.log('SAVE ERR', err_2);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        v = this.formGroup.value;
                        return [4 /*yield*/, this.entityService.createEntityPreset({
                                id: this.entityPreset.id,
                                userId: this.login.id,
                                campaignId: this.campaignService.campaign.id,
                                name: v.name,
                                description: v.description,
                                imageId: v.imageId,
                                playerCreatable: v.playerCreatable,
                                attributes: v.attributes,
                            })];
                    case 7:
                        ep = _a.sent();
                        return [4 /*yield*/, this.router.navigate(['../..', 'settings'], {
                                relativeTo: this.route,
                            })];
                    case 8:
                        _a.sent();
                        console.log('EF Create', ep);
                        _a.label = 9;
                    case 9:
                        this.saving = false;
                        this.formGroup.enable();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EntityFormComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.confirmModal.getConfirmation('Are you sure you want to delete this entity? This cannot be undone')];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 6];
                        this.deleting = true;
                        this.formGroup.disable();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.entityService.deleteEntityPreset(this.campaignService.campaign.id, '1')];
                    case 3:
                        _a.sent();
                        this.router.navigate(['../../..', 'settings'], {
                            relativeTo: this.route,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        console.log('DEL ERR', err_3);
                        return [3 /*break*/, 5];
                    case 5:
                        this.formGroup.enable();
                        this.deleting = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EntityFormComponent.prototype.addAttribute = function () {
        this.formGroup.get('attributes').push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({}));
    };
    Object.defineProperty(EntityFormComponent.prototype, "attributeControls", {
        get: function () {
            return this.formGroup.get('attributes').controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFormComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFormComponent.prototype, "description", {
        get: function () {
            return this.formGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFormComponent.prototype, "editing", {
        get: function () {
            return this.route.snapshot.data.editing;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('confirmmodal'),
        __metadata("design:type", src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmationModalComponent"])
    ], EntityFormComponent.prototype, "confirmModal", void 0);
    EntityFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-form',
            template: __webpack_require__(/*! ./entity-form.component.html */ "./src/app/entity/entity-form/entity-form.component.html"),
            styles: [__webpack_require__(/*! ./entity-form.component.css */ "./src/app/entity/entity-form/entity-form.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_entity_service__WEBPACK_IMPORTED_MODULE_4__["EntityService"],
            src_app_campaign_service__WEBPACK_IMPORTED_MODULE_5__["CampaignService"],
            src_app_login_service__WEBPACK_IMPORTED_MODULE_7__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], EntityFormComponent);
    return EntityFormComponent;
}());



/***/ }),

/***/ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <h3 class=\"mb-0\">Please choose a type</h3>\n  <span class=\"text-gray mb-2\">\n    These are the available types of entities the DM has allowed you to create\n  </span>\n\n  <!-- Empty state -->\n  <div class=\"empty mt-2\" *ngIf=\"presets.length === 0\">\n    <div class=\"empty-icon\"><i class=\"icon icon-search icon-3x\"></i></div>\n    <p class=\"empty-title h5\">There's nothing here!</p>\n    <p class=\"empty-subtitle\">\n      This campaign has not defined any entity types! Please bug your DM for\n      this.\n    </p>\n  </div>\n\n  <div class=\"spacer\"></div>\n\n  <div *ngIf=\"!creating\">\n    <div\n      class=\"card hoverable mb-2 p-2\"\n      *ngFor=\"let e of presets\"\n      (click)=\"selectEntityType(e)\"\n    >\n      <div class=\"columns\">\n        <div class=\"column col-auto\" *ngIf=\"e.imageId\">\n          <figure class=\"avatar\">\n            <img\n              src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n                e.imageId\n              }}.png\"\n            />\n          </figure>\n        </div>\n        <div class=\"column\">\n          <h4>{{ e.name }}</h4>\n          <span class=\"text-gray\"> {{ e.description | truncate: 150 }} </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\n  margin-bottom: 2.5rem; }\n"

/***/ }),

/***/ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: EntityTypeSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityTypeSelectorComponent", function() { return EntityTypeSelectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_entity_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/entity.service */ "./src/app/entity.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var EntityTypeSelectorComponent = /** @class */ (function () {
    function EntityTypeSelectorComponent(campaignService, router, route, entityService) {
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
        this.entityService = entityService;
    }
    EntityTypeSelectorComponent.prototype.ngOnInit = function () { };
    EntityTypeSelectorComponent.prototype.selectEntityType = function (preset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['..', preset.id, 'create'], {
                    relativeTo: this.route,
                });
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(EntityTypeSelectorComponent.prototype, "presets", {
        get: function () {
            return this.campaignService.campaign.entityPresets.filter(function (e) { return e.playerCreatable; });
        },
        enumerable: true,
        configurable: true
    });
    EntityTypeSelectorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-type-selector',
            template: __webpack_require__(/*! ./entity-type-selector.component.html */ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.html"),
            styles: [__webpack_require__(/*! ./entity-type-selector.component.scss */ "./src/app/entity/entity-form/entity-type-selector/entity-type-selector.component.scss")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_entity_service__WEBPACK_IMPORTED_MODULE_3__["EntityService"]])
    ], EntityTypeSelectorComponent);
    return EntityTypeSelectorComponent;
}());



/***/ }),

/***/ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.html":
/*!***************************************************************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-modal #modal>\n  <div modal-header *ngIf=\"attribute && control\">\n    <div class=\"modal-title\">Edit {{ attribute.name }}</div>\n  </div>\n\n  <div modal-body *ngIf=\"attribute && control\">\n    <form (ngSubmit)=\"ok()\" #attrForm=\"ngForm\">\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{\n          'has-error': control.invalid && (control.dirty || control.touched),\n          'has-success': control.valid && (control.dirty || control.touched)\n        }\"\n      >\n        <div [ngClass]=\"{ 'has-icon-left': attribute.imageId }\" [ngSwitch]=\"attribute.type\">\n          <!-- Text Input -->\n          <input\n            type=\"text\"\n            name=\"attr\"\n            class=\"form-input\"\n            [placeholder]=\"attribute.name\"\n            [formControl]=\"control\"\n            *ngSwitchCase=\"0\"\n          />\n\n          <!-- Number Input -->\n          <input\n            type=\"number\"\n            name=\"attr\"\n            class=\"form-input\"\n            [placeholder]=\"attribute.name\"\n            [formControl]=\"control\"\n            *ngSwitchCase=\"1\"\n          />\n\n          <!-- Enum input -->\n          <select class=\"form-input\" name=\"attr\" [formControl]=\"control\" *ngSwitchCase=\"2\">\n            <option *ngFor=\"let o of attribute.options\" [value]=\"o\">{{ o }}</option>\n          </select>\n\n          <figure class=\"form-icon avatar\" *ngIf=\"attribute.imageId\">\n            <img src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{ attribute.imageId }}.png\" />\n          </figure>\n        </div>\n        <p class=\"form-input-hint mb-0\">{{ attribute.description }}</p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"control.invalid && (control.dirty || control.touched) && control.errors.required\"\n        >\n          {{ attribute.name }} is required\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"control.invalid && (control.dirty || control.touched) && control.errors.min\"\n        >\n          {{ attribute.name }} can't be lower than {{ attribute.min }}\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"control.invalid && (control.dirty || control.touched) && control.errors.max\"\n        >\n          {{ attribute.name }} can't be higher than {{ attribute.max }}\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"control.invalid && (control.dirty || control.touched) && control.errors.minlength\"\n        >\n          {{ attribute.name }} cannot have less than {{ attribute.min }} characters\n        </p>\n        <p\n          class=\"form-input-hint mb-1\"\n          *ngIf=\"control.invalid && (control.dirty || control.touched) && control.errors.maxlength\"\n        >\n          {{ attribute.name }} cannot have more than {{ attribute.max }} characters\n        </p>\n      </div>\n    </form>\n  </div>\n\n  <div modal-footer *ngIf=\"attribute && control\">\n    <button class=\"btn btn-primary mr-2\" (click)=\"cancel()\">Cancel</button>\n    <button class=\"btn\" (click)=\"ok()\" [disabled]=\"control.invalid\">Save</button>\n  </div>\n</dd-modal>\n"

/***/ }),

/***/ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: EntityAttributeEditorModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityAttributeEditorModalComponent", function() { return EntityAttributeEditorModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modal/modal.component */ "./src/app/modal/modal.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/attributes */ "./src/app/attributes.ts");
/* harmony import */ var _dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var EntityAttributeEditorModalComponent = /** @class */ (function () {
    function EntityAttributeEditorModalComponent() {
    }
    EntityAttributeEditorModalComponent.prototype.ngOnInit = function () { };
    EntityAttributeEditorModalComponent.prototype.editAttribute = function (attribute, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.attribute = attribute;
                this.setupControl(currentValue);
                return [2 /*return*/, this.modal.open()];
            });
        });
    };
    EntityAttributeEditorModalComponent.prototype.ok = function () {
        if (this.control.invalid) {
            return;
        }
        this.modal.close(this.control.value);
    };
    EntityAttributeEditorModalComponent.prototype.cancel = function () {
        this.modal.close(null);
    };
    EntityAttributeEditorModalComponent.prototype.setupControl = function (currentValue) {
        var validators = [];
        if (this.attribute.type === src_app_attributes__WEBPACK_IMPORTED_MODULE_3__["AttributeType"].STRING) {
            if (this.attribute.min !== undefined && this.attribute.min !== null) {
                validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(this.attribute.min));
            }
            if (this.attribute.max !== undefined && this.attribute.max !== null) {
                validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(this.attribute.max));
            }
        }
        else if (this.attribute.type === src_app_attributes__WEBPACK_IMPORTED_MODULE_3__["AttributeType"].NUMBER) {
            if (this.attribute.min !== undefined && this.attribute.min !== null) {
                validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(this.attribute.min));
            }
            if (this.attribute.max !== undefined && this.attribute.max !== null) {
                validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(this.attribute.max));
            }
            validators.push(_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_4__["numberValidator"]);
        }
        if (this.attribute.required) {
            validators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
        }
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](currentValue, validators);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal'),
        __metadata("design:type", src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_1__["ModalComponent"])
    ], EntityAttributeEditorModalComponent.prototype, "modal", void 0);
    EntityAttributeEditorModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-attribute-editor-modal',
            template: __webpack_require__(/*! ./entity-attribute-editor-modal.component.html */ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.html"),
            styles: [__webpack_require__(/*! ./entity-attribute-editor-modal.component.css */ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], EntityAttributeEditorModalComponent);
    return EntityAttributeEditorModalComponent;
}());



/***/ }),

/***/ "./src/app/entity/entity-view/entity-view.component.html":
/*!***************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-view.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n\n<dd-entity-attribute-editor-modal\n  #attributemodal\n></dd-entity-attribute-editor-modal>\n\n<!-- Background container -->\n<div\n  class=\"player-bg d-flex\"\n  *ngIf=\"entity\"\n  [style.background-image]=\"backgroundCSS(entity.imageId)\"\n>\n  <div id=\"head-container\">\n    <!-- Top row -->\n    <div class=\"container grid-xl mb-auto\">\n      <div class=\"columns text-gray\">\n        <div class=\"column\" *ngIf=\"saving\">Saving...</div>\n      </div>\n    </div>\n\n    <!-- Bottom Row -->\n    <div class=\"container grid-xl\">\n      <div class=\"columns text-light\">\n        <div class=\"column text-light mb-1\">\n          <h3\n            class=\"mb-0 text-bold\"\n            [ngClass]=\"{ 'c-hand': editable }\"\n            (click)=\"editName()\"\n          >\n            {{ entity.name }}\n            <a class=\"text-light\" [routerLink]=\"['edit']\"\n              ><i class=\"icon icon-edit\"></i\n            ></a>\n          </h3>\n          <span class=\"text-italic\">{{ entity.preset.name }}</span>\n        </div>\n        <div class=\"column d-flex justify-end align-items-end col-ml-auto\">\n          <span [ngClass]=\"{ 'c-hand': editable }\" (click)=\"editXP()\">\n            <span class=\"h5\">LV. </span>\n            <span class=\"h3 text-bold\">{{ level }}</span>\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container grid-xl\" *ngIf=\"entity\">\n  <!-- Major attributes -->\n  <div class=\"columns\" *ngIf=\"majorAttributes.length > 0\">\n    <div\n      class=\"column col-2 col-md-3 col-sm-5 col-mx-auto text-center\"\n      [ngClass]=\"{ 'c-hand': editable }\"\n      *ngFor=\"let a of majorAttributes\"\n      (click)=\"editAttribute(a)\"\n    >\n      <div class=\"h5\">\n        <figure class=\"avatar avatar-sm\" *ngIf=\"a.pattr && a.pattr.imageId\">\n          <img\n            src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n              a.pattr.imageId\n            }}.png\"\n          />\n        </figure>\n        {{ a.attr.name }}\n      </div>\n      <div class=\"h4 text-bold\">{{ a.attr.data }}</div>\n    </div>\n  </div>\n\n  <div class=\"divider\" *ngIf=\"majorAttributes.length > 0\"></div>\n\n  <!-- Normal Attributes -->\n  <div class=\"columns\" *ngIf=\"normalAttributes.length > 0\">\n    <div\n      class=\"column col-1 col-md-2 col-sm-3 col-mx-auto text-center\"\n      [ngClass]=\"{ 'c-hand': editable }\"\n      *ngFor=\"let a of normalAttributes\"\n      (click)=\"editAttribute(a)\"\n    >\n      <div class=\"h6\">\n        <figure class=\"avatar avatar-xs\" *ngIf=\"a.pattr && a.pattr.imageId\">\n          <img\n            src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n              a.pattr.imageId\n            }}.png\"\n          />\n        </figure>\n        {{ a.attr.name }}\n      </div>\n      <div class=\"h5\">{{ a.attr.data }}</div>\n    </div>\n  </div>\n  <div class=\"divider\" *ngIf=\"normalAttributes.length > 0\"></div>\n\n  <div class=\"columns\">\n    <!-- Sidebar -->\n    <div class=\"column col-auto col-ml-auto\" *ngIf=\"minorAttributes.length > 0\">\n      <div class=\"table table-striped\" [ngClass]=\"{ 'table-hover': editable }\">\n        <thead>\n          <tr>\n            <th>Minor Attributes</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr\n            [ngClass]=\"{ 'c-hand': editable }\"\n            *ngFor=\"let attr of minorAttributes\"\n            (click)=\"editAttribute(attr)\"\n          >\n            <td>\n              <figure\n                class=\"avatar avatar-xs\"\n                *ngIf=\"attr.pattr && attr.pattr.imageId\"\n              >\n                <img\n                  src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n                    attr.pattr.imageId\n                  }}.png\"\n                />\n              </figure>\n              {{ attr.attr.name }}\n            </td>\n            <td class=\"text-bold\">{{ attr.attr.data }}</td>\n          </tr>\n        </tbody>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/entity/entity-view/entity-view.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-view.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".player-bg {\n  background-color: black;\n  min-height: 20vh;\n  margin-top: -0.4rem;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%), url(\"http://res.cloudinary.com/dqhk8k6iv/image/upload/t_chr_blur/chr_test.jpg\"); }\n\n#head-container {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: end; }\n"

/***/ }),

/***/ "./src/app/entity/entity-view/entity-view.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/entity/entity-view/entity-view.component.ts ***!
  \*************************************************************/
/*! exports provided: EntityViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityViewComponent", function() { return EntityViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _entity_attribute_editor_modal_entity_attribute_editor_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity-attribute-editor-modal/entity-attribute-editor-modal.component */ "./src/app/entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component.ts");
/* harmony import */ var src_app_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/entity */ "./src/app/entity.ts");
/* harmony import */ var src_app_entity_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/entity.service */ "./src/app/entity.service.ts");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var src_app_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/attributes */ "./src/app/attributes.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var EntityViewComponent = /** @class */ (function () {
    function EntityViewComponent(route, entityService, campaignService, sanitizer) {
        this.route = route;
        this.entityService = entityService;
        this.campaignService = campaignService;
        this.sanitizer = sanitizer;
        this.loading = false;
        this.saving = false;
    }
    EntityViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.loadEntity(params.get('ent_id'));
        });
    };
    EntityViewComponent.prototype.loadEntity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityService.getEntity(id)];
                    case 2:
                        ent = _a.sent();
                        this.entity = ent;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('LOAD ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityViewComponent.prototype.editAttribute = function (attr) {
        return __awaiter(this, void 0, void 0, function () {
            var attrValue, _i, _a, attribute;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.attributeModal.editAttribute(__assign({}, attr.pattr), attr.attr.data)];
                    case 1:
                        attrValue = _b.sent();
                        if (attrValue !== null && attrValue !== undefined) {
                            for (_i = 0, _a = this.entity.attributes; _i < _a.length; _i++) {
                                attribute = _a[_i];
                                if (attribute.name === attr.attr.name) {
                                    attribute.data = attrValue;
                                    break;
                                }
                            }
                            this.updateEntity();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityViewComponent.prototype.editName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var attrValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.attributeModal.editAttribute({
                            name: 'Name',
                            description: "What the " + this.entity.preset.name + " is called",
                            type: src_app_attributes__WEBPACK_IMPORTED_MODULE_6__["AttributeType"].STRING,
                            required: true,
                            min: 2,
                            max: 30,
                            class: src_app_entity__WEBPACK_IMPORTED_MODULE_3__["AttributeClass"].NORMAL,
                        }, this.entity.name)];
                    case 1:
                        attrValue = _a.sent();
                        if (attrValue !== null && attrValue !== undefined) {
                            this.entity.name = attrValue;
                            this.updateEntity();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityViewComponent.prototype.editXP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var attrValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.attributeModal.editAttribute({
                            name: 'XP',
                            description: "Experience points that this " + this.entity.preset.name + " has",
                            type: src_app_attributes__WEBPACK_IMPORTED_MODULE_6__["AttributeType"].NUMBER,
                            required: true,
                            min: 0,
                            max: 2147483647,
                            class: src_app_entity__WEBPACK_IMPORTED_MODULE_3__["AttributeClass"].NORMAL,
                        }, this.entity.xp.toString())];
                    case 1:
                        attrValue = _a.sent();
                        if (attrValue !== null && attrValue !== undefined) {
                            this.entity.xp = parseInt(attrValue, 10);
                            this.updateEntity();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityViewComponent.prototype.updateEntity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.saving = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityService.updateEntity(this.entity)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log('UPDATE ERR', err_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.saving = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityViewComponent.prototype.getEntityAttribute = function (name) {
        return this.entity.preset.attributes.find(function (e) { return e.name === name; });
    };
    Object.defineProperty(EntityViewComponent.prototype, "processedAttributes", {
        get: function () {
            var _this = this;
            return this.entity.attributes.map(function (a) {
                return {
                    attr: a,
                    pattr: _this.getEntityAttribute(a.name),
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "majorAttributes", {
        get: function () {
            var _this = this;
            return this.entity.attributes
                .map(function (a) {
                return {
                    attr: a,
                    pattr: _this.getEntityAttribute(a.name),
                };
            })
                .filter(function (a) { return a.pattr && a.pattr.class === 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "normalAttributes", {
        get: function () {
            var _this = this;
            return this.entity.attributes
                .map(function (a) {
                return {
                    attr: a,
                    pattr: _this.getEntityAttribute(a.name),
                };
            })
                .filter(function (a) { return a.pattr && a.pattr.class === 1; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "minorAttributes", {
        get: function () {
            var _this = this;
            return this.entity.attributes
                .map(function (a) {
                return {
                    attr: a,
                    pattr: _this.getEntityAttribute(a.name),
                };
            })
                .filter(function (a) { return a.pattr && a.pattr.class === 2; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "unimportantAttributes", {
        get: function () {
            var _this = this;
            return this.entity.attributes
                .map(function (a) {
                return {
                    attr: a,
                    pattr: _this.getEntityAttribute(a.name),
                };
            })
                .filter(function (a) { return a.pattr && a.pattr.class === 3; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "level", {
        get: function () {
            return this.campaignService.calculateLevel(this.entity.xp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityViewComponent.prototype, "editable", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    EntityViewComponent.prototype.backgroundCSS = function (imageId) {
        return this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(\"http://res.cloudinary.com/dqhk8k6iv/image/upload/t_chr_blur/" + imageId + ".jpg\")");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('attributemodal'),
        __metadata("design:type", _entity_attribute_editor_modal_entity_attribute_editor_modal_component__WEBPACK_IMPORTED_MODULE_2__["EntityAttributeEditorModalComponent"])
    ], EntityViewComponent.prototype, "attributeModal", void 0);
    EntityViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-entity-view',
            template: __webpack_require__(/*! ./entity-view.component.html */ "./src/app/entity/entity-view/entity-view.component.html"),
            styles: [__webpack_require__(/*! ./entity-view.component.scss */ "./src/app/entity/entity-view/entity-view.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_entity_service__WEBPACK_IMPORTED_MODULE_4__["EntityService"],
            src_app_campaign_service__WEBPACK_IMPORTED_MODULE_5__["CampaignService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"]])
    ], EntityViewComponent);
    return EntityViewComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <h3>Hello, {{ user.username }}</h3>\n</div>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(login) {
        this.login = login;
    }
    HomeComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(HomeComponent.prototype, "user", {
        get: function () {
            return this.login.user;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")],
        }),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/image-upload/image-upload.component.html":
/*!**********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group\" [ngClass]=\"{ 'has-error': control.invalid }\">\n  <div\n    class=\"p-2\"\n    id=\"drop-area\"\n    [ngClass]=\"{\n      'drag-over': isDragOver,\n      'file-has-error': control.invalid\n    }\"\n    #fupload\n  >\n    <input\n      type=\"file\"\n      [id]=\"controlId\"\n      accept=\"image/*\"\n      class=\"file-input\"\n      (change)=\"onFileChange($event)\"\n    />\n    <label class=\"btn btn-sm text-ellipsis\" [for]=\"controlId\">\n      <span *ngIf=\"file === null && imageURL === null\">Upload Image</span>\n      <span *ngIf=\"file === null && imageURL !== null\">Change Image</span>\n      <span *ngIf=\"file !== null\">{{ file.name }}</span>\n    </label>\n    <button\n      class=\"btn btn-error btn-sm mt-2\"\n      *ngIf=\"imageURL !== null\"\n      (click)=\"clearImage()\"\n    >\n      Clear Image\n    </button>\n\n    <!-- Progress bar -->\n    <div class=\"bar bar-sm mt-2\" *ngIf=\"isUploading\">\n      <div\n        class=\"bar-item\"\n        role=\"progressbar\"\n        [style.width]=\"uploadProgress + '%'\"\n      ></div>\n    </div>\n\n    <!-- Preview image -->\n    <img\n      class=\"image-preview img-fit-contain mt-2\"\n      *ngIf=\"imageURL !== null\"\n      [src]=\"imageURL\"\n    />\n  </div>\n  <p class=\"form-input-hint\" *ngIf=\"control.invalid && control.errors.required\">\n    An image is required\n  </p>\n</div>\n\n<div class=\"toast toast-error\" *ngIf=\"fileError !== null\">\n  <button class=\"btn btn-clear float-right\" (click)=\"clearError()\"></button>\n  {{ fileError }}\n</div>\n"

/***/ }),

/***/ "./src/app/image-upload/image-upload.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#drop-area {\n  border: 2px dashed #5755d9;\n  border-radius: 0.1rem;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  flex-direction: column; }\n\n.form-group.has-error > #drop-area {\n  border: 2px dashed #e85600; }\n\n#drop-area.drag-over {\n  cursor: pointer;\n  background: #f1f1fc; }\n\n.file-input {\n  display: none; }\n\n.image-preview {\n  height: 10vh; }\n"

/***/ }),

/***/ "./src/app/image-upload/image-upload.component.ts":
/*!********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.ts ***!
  \********************************************************/
/*! exports provided: ImageUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageUploadComponent", function() { return ImageUploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImageUploadComponent = /** @class */ (function () {
    function ImageUploadComponent() {
        this.file = null;
        this.fileError = null;
        this.isDragOver = false;
        this.isUploading = false;
        this.uploadProgress = null;
        this.eleId = '';
    }
    ImageUploadComponent.prototype.ngOnInit = function () {
        if (!this.formGroup.contains('imageId')) {
            this.formGroup.addControl('imageId', new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null));
        }
    };
    ImageUploadComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        ['dragenter', 'dragover'].forEach(function (evt) {
            return _this.fupload.nativeElement.addEventListener(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.isDragOver = true;
            });
        });
        ['dragleave', 'dragend', 'drop'].forEach(function (evt) {
            return _this.fupload.nativeElement.addEventListener(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.isDragOver = false;
            });
        });
        this.fupload.nativeElement.addEventListener('drop', function (e) {
            if (e.dataTransfer.files.length > 0) {
                _this.handleFileUpload(e.dataTransfer.files[0]);
            }
        });
    };
    ImageUploadComponent.prototype.clearImage = function () {
        this.formGroup.get('imageId').reset();
    };
    ImageUploadComponent.prototype.clearError = function () {
        this.fileError = null;
    };
    ImageUploadComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        if (files.length > 0) {
            this.handleFileUpload(files[0]);
        }
    };
    Object.defineProperty(ImageUploadComponent.prototype, "imageURL", {
        get: function () {
            if (this.formGroup.get('imageId').value !== null &&
                this.formGroup.get('imageId').value !== undefined &&
                this.formGroup.get('imageId').value !== '') {
                return "https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/" + this.formGroup.get('imageId').value + ".png";
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ImageUploadComponent.prototype.handleFileUpload = function (file) {
        var _this = this;
        this.fileError = null;
        this.uploadProgress = null;
        if (!file.type.startsWith('image/')) {
            this.fileError = 'Incorrect file type! Only images are accepted';
            return;
        }
        this.file = file;
        var form = new FormData();
        form.append('file', this.file);
        form.append('upload_preset', 'gvmyptoo');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/dqhk8k6iv/auto/upload', true);
        xhr.onload = function (e) {
            var image = JSON.parse(xhr.responseText);
            _this.isUploading = false;
            _this.file = null;
            _this.formGroup.get('imageId').setValue(image.public_id);
        };
        xhr.upload.addEventListener('progress', function (e) {
            _this.uploadProgress = (e.loaded / e.total) * 100;
        });
        this.isUploading = true;
        xhr.send(form);
    };
    Object.defineProperty(ImageUploadComponent.prototype, "controlId", {
        get: function () {
            return "file-upload-" + this.eleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "control", {
        get: function () {
            return this.formGroup.get('imageId');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fupload'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ImageUploadComponent.prototype, "fupload", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], ImageUploadComponent.prototype, "formGroup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ImageUploadComponent.prototype, "eleId", void 0);
    ImageUploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-image-upload',
            template: __webpack_require__(/*! ./image-upload.component.html */ "./src/app/image-upload/image-upload.component.html"),
            styles: [__webpack_require__(/*! ./image-upload.component.scss */ "./src/app/image-upload/image-upload.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());



/***/ }),

/***/ "./src/app/invite/invite.component.css":
/*!*********************************************!*\
  !*** ./src/app/invite/invite.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/invite/invite.component.html":
/*!**********************************************!*\
  !*** ./src/app/invite/invite.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <!-- Loading -->\n  <div class=\"columns\" *ngIf=\"loading\">\n    <div class=\"column col-4 col-md-6 col-sm-12 col-mx-auto\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          Processing information...\n          <div class=\"loading\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"columns\" *ngIf=\"!loading && campaign\">\n    <div class=\"column col-6 col-md-10 col-sm-12 text-center col-mx-auto\">\n      <!-- Invite Display -->\n      <div class=\"card p-2\" *ngIf=\"invite.status === 0\">\n        <h2>Would you like to join this campaign?</h2>\n        <figure class=\"avatar avatar-xl align-self-center\">\n          <img\n            src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n              campaign.imageId\n            }}.png\"\n          />\n        </figure>\n        <h1>{{ campaign.name }}</h1>\n        <p class=\"text-gray\">{{ campaign.description }}</p>\n        <!-- Buttons -->\n        <button class=\"btn btn-lg my-2\" (click)=\"deny()\">No</button>\n        <button\n          class=\"btn btn-primary btn-lg\"\n          [ngClass]=\"{ loading: accepting }\"\n          (click)=\"accept()\"\n        >\n          Yes\n        </button>\n      </div>\n\n      <!-- Invalid Invite Display -->\n      <div class=\"toast text-left toast-error\" *ngIf=\"invite.status !== 0\">\n        <h6>Invalid Invite</h6>\n        <p>\n          Unfortunately this invite is no longer valid. Sorry about that\n          ¯\\_(ツ)_/¯\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/invite/invite.component.ts":
/*!********************************************!*\
  !*** ./src/app/invite/invite.component.ts ***!
  \********************************************/
/*! exports provided: InviteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteComponent", function() { return InviteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
/* harmony import */ var _action_queue_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../action-queue.service */ "./src/app/action-queue.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../campaign.service */ "./src/app/campaign.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var InviteComponent = /** @class */ (function () {
    function InviteComponent(login, actions, campaignService, router, route) {
        this.login = login;
        this.actions = actions;
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
        this.loading = false;
        this.accepting = false;
        this.denying = false;
    }
    InviteComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actions, isLoggedIn, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actions = this.actions.queue;
                        actions.unshift({
                            type: _action_queue_service__WEBPACK_IMPORTED_MODULE_2__["ActionType"].INVITE,
                            data: {
                                inviteId: this.route.snapshot.paramMap.get('invite_id'),
                            },
                        });
                        this.actions.save();
                        return [4 /*yield*/, this.login.isLoggedIn()];
                    case 1:
                        isLoggedIn = _a.sent();
                        if (!!isLoggedIn) return [3 /*break*/, 2];
                        this.router.navigate(['login']);
                        return [3 /*break*/, 8];
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        this.loading = true;
                        return [4 /*yield*/, this.loadInvite()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadCampaign()];
                    case 4:
                        _a.sent();
                        if (this.invite.status !== 0) {
                            this.actions.queue.pop();
                            this.actions.save();
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        err_1 = _a.sent();
                        this.actions.queue.pop();
                        this.actions.save();
                        return [4 /*yield*/, this.router
                                .navigate(['home'])
                                .catch(function (err) {
                                return console.log('ROPUTE', err.name, err.message, err.stack);
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        this.loading = false;
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    InviteComponent.prototype.accept = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.accepting = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.campaignService.acceptInvite(this.invite.id)];
                    case 2:
                        _a.sent();
                        this.actions.queue.pop();
                        this.actions.save();
                        this.router.navigate(['campaigns', this.campaign.id, 'landing']);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log('ACCERR', err_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.accepting = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteComponent.prototype.deny = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.denying = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.campaignService.denyInvite(this.invite.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log('ACCERR', err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.actions.queue.pop();
                        this.actions.save();
                        this.router.navigate(['home']);
                        this.denying = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteComponent.prototype.loadCampaign = function () {
        return __awaiter(this, void 0, void 0, function () {
            var campaign, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.campaignService.getCampaign(this.invite.campaignId)];
                    case 1:
                        campaign = _a.sent();
                        this.campaign = campaign;
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log('CLERR', err_4);
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InviteComponent.prototype.loadInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var invite, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.campaignService.getInvite(this.route.snapshot.paramMap.get('invite_id'))];
                    case 1:
                        invite = _a.sent();
                        this.invite = invite;
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log('INVITE LOAD ERR', err_5);
                        throw err_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InviteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-invite',
            template: __webpack_require__(/*! ./invite.component.html */ "./src/app/invite/invite.component.html"),
            styles: [__webpack_require__(/*! ./invite.component.css */ "./src/app/invite/invite.component.css")],
        }),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"],
            _action_queue_service__WEBPACK_IMPORTED_MODULE_2__["ActionQueueService"],
            _campaign_service__WEBPACK_IMPORTED_MODULE_4__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], InviteComponent);
    return InviteComponent;
}());



/***/ }),

/***/ "./src/app/item.service.ts":
/*!*********************************!*\
  !*** ./src/app/item.service.ts ***!
  \*********************************/
/*! exports provided: ItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemService", function() { return ItemService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes */ "./src/app/attributes.ts");
/* harmony import */ var chance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chance */ "./node_modules/chance/chance.js");
/* harmony import */ var chance__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chance__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ItemService = /** @class */ (function () {
    function ItemService() {
    }
    ItemService.prototype.createItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulateDelay(250)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, '1'];
                }
            });
        });
    };
    ItemService.prototype.saveItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulateDelay(250)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemService.prototype.getItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var c_1, item_1, c, item;
            return __generator(this, function (_a) {
                if (id === '1') {
                    c_1 = new chance__WEBPACK_IMPORTED_MODULE_2__["Chance"]();
                    item_1 = {
                        id: id,
                        name: '--_blank_--',
                        description: '--_blank_--',
                        imageId: 'uncertainty',
                        attributes: [{ name: 'Weight', data: '6', type: _attributes__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].NUMBER }],
                    };
                    return [2 /*return*/, item_1];
                }
                c = new chance__WEBPACK_IMPORTED_MODULE_2__["Chance"]();
                item = {
                    id: id,
                    name: c.sentence({ words: c.integer({ min: 1, max: 3 }) }),
                    description: c.paragraph(),
                    imageId: 'uncertainty',
                    attributes: [{ name: 'Weight', data: '6', type: _attributes__WEBPACK_IMPORTED_MODULE_1__["AttributeType"].NUMBER }],
                };
                return [2 /*return*/, item];
            });
        });
    };
    ItemService.prototype.deleteItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, simulateDelay(255)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [])
    ], ItemService);
    return ItemService;
}());

// Used in mock apis, will be removed
var simulateDelay = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};


/***/ }),

/***/ "./src/app/items/attribute-editor/attribute-editor.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/items/attribute-editor/attribute-editor.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/items/attribute-editor/attribute-editor.component.html":
/*!************************************************************************!*\
  !*** ./src/app/items/attribute-editor/attribute-editor.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"formGroup\">\n  <button class=\"btn\" (click)=\"addAttribute()\">Add Attribute</button>\n  <div\n    formArrayName=\"attributes\"\n    *ngFor=\"let item of attributeControls; let i = index\"\n  >\n    <div class=\"columns\" [formGroupName]=\"i\">\n      <div class=\"column\">\n        <div\n          class=\"form-group\"\n          [ngClass]=\"{ 'has-error': getNameErrors(i) !== null }\"\n        >\n          <label class=\"form-label\">Name</label>\n          <input\n            class=\"form-input\"\n            formControlName=\"name\"\n            type=\"text\"\n            placeholder=\"Name\"\n          />\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"getNameErrors(i) !== null && getNameErrors(i).required\"\n          >\n            The attribute needs a name\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"getNameErrors(i) !== null && getNameErrors(i).minlength\"\n          >\n            The name cannot be shorter than 3 characters\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"getNameErrors(i) !== null && getNameErrors(i).maxlength\"\n          >\n            The name cannot be longer than 50 characters\n          </p>\n        </div>\n      </div>\n      <div class=\"column\">\n        <div\n          class=\"form-group\"\n          [ngClass]=\"{\n            'has-error': getDataErrors(i) !== null\n          }\"\n        >\n          <label class=\"form-label\">Value</label>\n          <input\n            class=\"form-input\"\n            formControlName=\"data\"\n            type=\"text\"\n            placeholder=\"Value\"\n            *ngIf=\"formGroup.value.attributes[i].type === '0'\"\n          />\n          <input\n            class=\"form-input\"\n            formControlName=\"data\"\n            type=\"number\"\n            placeholder=\"Value\"\n            *ngIf=\"formGroup.value.attributes[i].type === '1'\"\n          />\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"getDataErrors(i) !== null && getDataErrors(i).required\"\n          >\n            The attribute needs a value\n          </p>\n          <p\n            class=\"form-input-hint\"\n            *ngIf=\"getDataErrors(i) !== null && getDataErrors(i).maxlength\"\n          >\n            The value cannot be longer than 255 characters\n          </p>\n        </div>\n      </div>\n      <div class=\"column\">\n        <div class=\"form-group\">\n          <label class=\"form-label\">Type</label>\n          <select class=\"form-select\" formControlName=\"type\">\n            <option value=\"0\">Word</option>\n            <option value=\"1\">Number</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"column col-auto\">\n        <label class=\"form-label text-light\">.</label>\n        <button class=\"btn btn-link\" (click)=\"removeAttribute(i)\">\n          Remove\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/attribute-editor/attribute-editor.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/items/attribute-editor/attribute-editor.component.ts ***!
  \**********************************************************************/
/*! exports provided: AttributeEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeEditorComponent", function() { return AttributeEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/attributes */ "./src/app/attributes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AttributeEditorComponent = /** @class */ (function () {
    function AttributeEditorComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    AttributeEditorComponent_1 = AttributeEditorComponent;
    AttributeEditorComponent.createAttributesControl = function (attributes) {
        var controls = [];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attr = attributes_1[_i];
            controls.push(this.createAttributeFormItem(attr.name, attr.type, attr.data));
        }
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"](controls);
    };
    AttributeEditorComponent.createAttributeFormItem = function (presetName, presetType, presetValue) {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](presetName, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50),
            ]),
            data: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](presetValue, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(255),
            ]),
            type: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](presetType ? presetType.toString() : src_app_attributes__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].STRING.toString(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
        });
    };
    AttributeEditorComponent.prototype.ngOnInit = function () {
        if (!this.formGroup.contains('attributes')) {
            this.formGroup.addControl('attributes', this.formBuilder.array([]));
            this.addAttribute('Weight', src_app_attributes__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].NUMBER, '10');
        }
    };
    AttributeEditorComponent.prototype.addAttribute = function (presetName, presetType, presetValue) {
        var attributes = this.formGroup.get('attributes');
        attributes.push(AttributeEditorComponent_1.createAttributeFormItem(presetName, presetType, presetValue));
    };
    AttributeEditorComponent.prototype.removeAttribute = function (i) {
        var attributes = this.formGroup.get('attributes');
        attributes.removeAt(i);
    };
    AttributeEditorComponent.prototype.getNameErrors = function (i) {
        return this.formGroup.get(['attributes', i, 'name']).errors;
    };
    AttributeEditorComponent.prototype.getDataErrors = function (i) {
        return this.formGroup.get(['attributes', i, 'data']).errors;
    };
    AttributeEditorComponent.prototype.getTypeErrors = function (i) {
        return this.formGroup.get(['attributes', i, 'type']).errors;
    };
    AttributeEditorComponent.prototype.attributeRowHasError = function (i) {
        return this.formGroup.get(['attributes', i]).valid;
    };
    Object.defineProperty(AttributeEditorComponent.prototype, "attributeControls", {
        get: function () {
            return this.formGroup.get('attributes').controls;
        },
        enumerable: true,
        configurable: true
    });
    var AttributeEditorComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"])
    ], AttributeEditorComponent.prototype, "formGroup", void 0);
    AttributeEditorComponent = AttributeEditorComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-attribute-editor',
            template: __webpack_require__(/*! ./attribute-editor.component.html */ "./src/app/items/attribute-editor/attribute-editor.component.html"),
            styles: [__webpack_require__(/*! ./attribute-editor.component.css */ "./src/app/items/attribute-editor/attribute-editor.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], AttributeEditorComponent);
    return AttributeEditorComponent;
}());



/***/ }),

/***/ "./src/app/items/inventory-selector/inventory-selector.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/items/inventory-selector/inventory-selector.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-confirmation-modal #confirm></dd-confirmation-modal>\n<dd-modal #itemselector>\n  <div class=\"modal-title h5\" modal-header>Select an Item</div>\n\n  <div modal-body>\n    <dd-item-view-list\n      *ngFor=\"let i of items\"\n      [item]=\"i\"\n      (click)=\"itemselector.close(i)\"\n    ></dd-item-view-list>\n  </div>\n</dd-modal>\n\n<dd-modal size=\"small\" #itemedit>\n  <div class=\"modal-title h5\" modal-header>Edit Item</div>\n  <div [formGroup]=\"itemEditorGroup\" modal-body>\n    <div class=\"form-group\">\n      <label for=\"quantity\" class=\"form-label\">Quantity</label>\n      <input\n        type=\"number\"\n        class=\"form-input\"\n        name=\"quantity\"\n        id=\"quantity\"\n        formControlName=\"quantity\"\n        placeholder=\"Quantity\"\n      />\n    </div>\n  </div>\n  <div modal-footer>\n    <button class=\"btn btn-error mr-2\" (click)=\"removeItem()\">\n      Remove Item\n    </button>\n    <button class=\"btn\" (click)=\"itemedit.close()\">Done</button>\n  </div>\n</dd-modal>\n\n<!-- Item display -->\n<div class=\"card\">\n  <div class=\"card-body\">\n    <button class=\"btn btn-sm\" (click)=\"addItem()\">\n      <i class=\"icon icon-plus\"></i> Add Item\n    </button>\n  </div>\n  <div class=\"card-body d-flex item-container\">\n    <!-- Repeat Cards -->\n    <div\n      class=\"item mr-1\"\n      *ngFor=\"let i of selectedItems\"\n      [style.background-image]=\"backgroundCSS(i.item.imageId)\"\n      (click)=\"selectItem(i)\"\n    >\n      <h6 class=\"text-center\">{{ i.item.name }} ({{ i.quantity }})</h6>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/inventory-selector/inventory-selector.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/items/inventory-selector/inventory-selector.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item {\n  padding: 0.4rem;\n  flex-grow: 0.2;\n  flex-shrink: 0;\n  min-width: 7.5rem;\n  max-width: 8rem;\n  color: white;\n  background-image: url(\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_blurred_bg/uncertainty.png\"), linear-gradient(to top, black 0%, black 100%);\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-blend-mode: hard-light;\n  transition: -webkit-transform 0.25s;\n  transition: transform 0.25s;\n  transition: transform 0.25s, -webkit-transform 0.25s; }\n\n.item:hover {\n  -webkit-transform: translateY(-0.25rem);\n          transform: translateY(-0.25rem);\n  cursor: pointer; }\n\n.item-container {\n  overflow-x: auto; }\n"

/***/ }),

/***/ "./src/app/items/inventory-selector/inventory-selector.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/items/inventory-selector/inventory-selector.component.ts ***!
  \**************************************************************************/
/*! exports provided: InventorySelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventorySelectorComponent", function() { return InventorySelectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/confirmation-modal/confirmation-modal.component */ "./src/app/confirmation-modal/confirmation-modal.component.ts");
/* harmony import */ var src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modal/modal.component */ "./src/app/modal/modal.component.ts");
/* harmony import */ var src_app_item_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/item.service */ "./src/app/item.service.ts");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var src_app_entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component */ "./src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var InventorySelectorComponent = /** @class */ (function () {
    function InventorySelectorComponent(itemService, sanitizer, campaignService) {
        this.itemService = itemService;
        this.sanitizer = sanitizer;
        this.campaignService = campaignService;
    }
    InventorySelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formGroup.addControl('inventory', new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            items: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArray"](this.entityPreset.inventory.items.map(function (i) { return _this.createControl(i); })),
        }));
        this.itemEditorGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            quantity: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](1, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, src_app_entity_dynamic_attribute_form_dynamic_attribute_form_component__WEBPACK_IMPORTED_MODULE_7__["numberValidator"]]),
        });
        this.selectedItems = [];
    };
    InventorySelectorComponent.prototype.createControl = function (i) {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](i.item.id, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
    };
    InventorySelectorComponent.prototype.selectItem = function (item) {
        this.currentItem = item;
        this.itemEditorGroup.setValue({ quantity: item.quantity });
        this.itemEditor.open();
    };
    InventorySelectorComponent.prototype.ngAfterContentInit = function () { };
    InventorySelectorComponent.prototype.addItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.itemSelector.open().then(function (item) {
                    if (item !== undefined) {
                        _this.selectedItems.push({
                            quantity: 1,
                            item: item,
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    InventorySelectorComponent.prototype.removeItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentItem = this.currentItem;
                        this.itemEditor.close(null);
                        return [4 /*yield*/, this.confirmation.getConfirmation('Are you sure you want to remove this item?')];
                    case 1:
                        if (_a.sent()) {
                            console.log('removing item', this.currentItem);
                            this.selectedItems = this.selectedItems.filter(function (i) { return i !== _this.currentItem; });
                        }
                        else {
                            this.selectItem(currentItem);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    InventorySelectorComponent.prototype.imageSource = function (id) {
        return "https://res.cloudinary.com/dqhk8k6iv/image/upload/t_blurred_bg/" + id + ".png";
    };
    InventorySelectorComponent.prototype.backgroundCSS = function (imageId) {
        return this.sanitizer.bypassSecurityTrustStyle("url(\"" + this.imageSource(imageId) + "\"), linear-gradient(to top, black 0%, black 100%)");
    };
    Object.defineProperty(InventorySelectorComponent.prototype, "items", {
        get: function () {
            return this.campaignService.campaign.items;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('itemselector'),
        __metadata("design:type", src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_4__["ModalComponent"])
    ], InventorySelectorComponent.prototype, "itemSelector", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('itemedit'),
        __metadata("design:type", src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_4__["ModalComponent"])
    ], InventorySelectorComponent.prototype, "itemEditor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('confirm'),
        __metadata("design:type", src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmationModalComponent"])
    ], InventorySelectorComponent.prototype, "confirmation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InventorySelectorComponent.prototype, "entityPreset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], InventorySelectorComponent.prototype, "formGroup", void 0);
    InventorySelectorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-inventory-selector',
            template: __webpack_require__(/*! ./inventory-selector.component.html */ "./src/app/items/inventory-selector/inventory-selector.component.html"),
            styles: [__webpack_require__(/*! ./inventory-selector.component.scss */ "./src/app/items/inventory-selector/inventory-selector.component.scss")],
        }),
        __metadata("design:paramtypes", [src_app_item_service__WEBPACK_IMPORTED_MODULE_5__["ItemService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            src_app_campaign_service__WEBPACK_IMPORTED_MODULE_6__["CampaignService"]])
    ], InventorySelectorComponent);
    return InventorySelectorComponent;
}());



/***/ }),

/***/ "./src/app/items/item-edit/item-edit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/items/item-edit/item-edit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/items/item-edit/item-edit.component.html":
/*!**********************************************************!*\
  !*** ./src/app/items/item-edit/item-edit.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<dd-confirmation-modal #confirmmodal></dd-confirmation-modal>\n<div class=\"container grid-xl\">\n  <div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n\n  <div class=\"columns col-oneline\">\n    <div class=\"column\">\n      <a class=\"btn\" [routerLink]=\"['../..']\"\n        ><i class=\"icon icon-arrow-left\"></i> Back</a\n      >\n    </div>\n    <div class=\"column col-ml-auto col-auto\">\n      <button\n        class=\"btn btn-error mr-2\"\n        [ngClass]=\"{ loading: deleting }\"\n        [disabled]=\"saving\"\n        (click)=\"delete()\"\n      >\n        Delete\n      </button>\n      <button\n        class=\"btn\"\n        [disabled]=\"!valid || saving\"\n        (click)=\"save()\"\n        [ngClass]=\"{ loading: saving }\"\n      >\n        Save\n      </button>\n    </div>\n  </div>\n  <hr />\n  <dd-item-form *ngIf=\"item\" [inputItem]=\"item\" #iform></dd-item-form>\n</div>\n"

/***/ }),

/***/ "./src/app/items/item-edit/item-edit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/items/item-edit/item-edit.component.ts ***!
  \********************************************************/
/*! exports provided: ItemEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemEditComponent", function() { return ItemEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _item_form_item_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../item-form/item-form.component */ "./src/app/items/item-form/item-form.component.ts");
/* harmony import */ var src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/confirmation-modal/confirmation-modal.component */ "./src/app/confirmation-modal/confirmation-modal.component.ts");
/* harmony import */ var src_app_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/item.service */ "./src/app/item.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ItemEditComponent = /** @class */ (function () {
    function ItemEditComponent(route, itemService, router) {
        this.route = route;
        this.itemService = itemService;
        this.router = router;
        this.loading = false;
        this.item = null;
        this.saving = false;
        this.deleting = false;
        this.valid = true;
    }
    ItemEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params.item_id;
            _this.loadItem(id);
        });
    };
    ItemEditComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itm, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.form || !this.form.formGroup || !this.form.formGroup.valid) {
                            return [2 /*return*/];
                        }
                        this.form.formGroup.disable();
                        this.saving = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.itemService.saveItem((this.form.formGroup.value))];
                    case 2:
                        itm = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('SAVE ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.saving = false;
                        this.form.formGroup.enable();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemEditComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.confirmModal.getConfirmation('Are you sure you want to delete this item? This cannot be undone.')];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 6];
                        this.deleting = true;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.itemService.deleteItem(this.item.id)];
                    case 3:
                        _a.sent();
                        this.router.navigate(['../..'], { relativeTo: this.route });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        console.log('DEL ERR', err_2);
                        return [3 /*break*/, 5];
                    case 5:
                        this.deleting = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemEditComponent.prototype.loadItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        this.item = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.itemService.getItem(id)];
                    case 2:
                        item = _a.sent();
                        this.item = item;
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log('LOAD ERR', err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        setTimeout(function () {
                            _this.setupFormListener(_this.form.formGroup);
                        }, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemEditComponent.prototype.setupFormListener = function (formGroup) {
        var _this = this;
        formGroup.valueChanges.subscribe(function (v) {
            _this.valid = formGroup.valid;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('confirmmodal'),
        __metadata("design:type", src_app_confirmation_modal_confirmation_modal_component__WEBPACK_IMPORTED_MODULE_3__["ConfirmationModalComponent"])
    ], ItemEditComponent.prototype, "confirmModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('iform'),
        __metadata("design:type", _item_form_item_form_component__WEBPACK_IMPORTED_MODULE_2__["ItemFormComponent"])
    ], ItemEditComponent.prototype, "form", void 0);
    ItemEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-item-edit',
            template: __webpack_require__(/*! ./item-edit.component.html */ "./src/app/items/item-edit/item-edit.component.html"),
            styles: [__webpack_require__(/*! ./item-edit.component.css */ "./src/app/items/item-edit/item-edit.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_item_service__WEBPACK_IMPORTED_MODULE_4__["ItemService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ItemEditComponent);
    return ItemEditComponent;
}());



/***/ }),

/***/ "./src/app/items/item-form/item-form.component.css":
/*!*********************************************************!*\
  !*** ./src/app/items/item-form/item-form.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/items/item-form/item-form.component.html":
/*!**********************************************************!*\
  !*** ./src/app/items/item-form/item-form.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"formGroup\">\n  <div class=\"columns\">\n    <div class=\"column col-auto\">\n      <dd-image-upload [formGroup]=\"formGroup\"></dd-image-upload>\n    </div>\n    <div class=\"column\">\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': name.invalid }\">\n        <label class=\"form-label label-lg\" for=\"item-name\">Name</label>\n        <input\n          class=\"form-input input-lg\"\n          formControlName=\"name\"\n          type=\"text\"\n          id=\"item-name\"\n          placeholder=\"Sword of Agatha\"\n        />\n        <p class=\"form-input-hint\" *ngIf=\"name.invalid && name.errors.required\">\n          The item needs a name\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.errors.minlength\"\n        >\n          The name is too short\n        </p>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"name.invalid && name.errors.maxlength\"\n        >\n          The name can't be more than 60 characters long\n        </p>\n      </div>\n\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': description.invalid }\">\n        <label class=\"form-label\" for=\"item-description\">Description</label>\n        <textarea\n          class=\"form-input\"\n          formControlName=\"description\"\n          id=\"item-description\"\n          rows=\"5\"\n          placeholder=\"Sharp sword made of metal\"\n        ></textarea>\n        <p\n          class=\"form-input-hint\"\n          *ngIf=\"description.invalid && description.errors.required\"\n        >\n          The item needs a description\n        </p>\n      </div>\n\n      <dd-attribute-editor [formGroup]=\"formGroup\"></dd-attribute-editor>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/item-form/item-form.component.ts":
/*!********************************************************!*\
  !*** ./src/app/items/item-form/item-form.component.ts ***!
  \********************************************************/
/*! exports provided: ItemFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemFormComponent", function() { return ItemFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _attribute_editor_attribute_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../attribute-editor/attribute-editor.component */ "./src/app/items/attribute-editor/attribute-editor.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemFormComponent = /** @class */ (function () {
    function ItemFormComponent() {
    }
    ItemFormComponent.prototype.ngOnInit = function () {
        if (this.inputItem !== undefined) {
            this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.inputItem.name, [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(60),
                ]),
                description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.inputItem.description, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
                imageId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.inputItem.imageId),
                attributes: _attribute_editor_attribute_editor_component__WEBPACK_IMPORTED_MODULE_2__["AttributeEditorComponent"].createAttributesControl(this.inputItem.attributes),
            });
        }
        else {
            this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
                name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
                description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
                imageId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('cvgvysrwdivcxjfipjry'),
            });
        }
    };
    Object.defineProperty(ItemFormComponent.prototype, "name", {
        get: function () {
            return this.formGroup.controls.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemFormComponent.prototype, "description", {
        get: function () {
            return this.formGroup.controls.description;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ItemFormComponent.prototype, "inputItem", void 0);
    ItemFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-item-form',
            template: __webpack_require__(/*! ./item-form.component.html */ "./src/app/items/item-form/item-form.component.html"),
            styles: [__webpack_require__(/*! ./item-form.component.css */ "./src/app/items/item-form/item-form.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], ItemFormComponent);
    return ItemFormComponent;
}());



/***/ }),

/***/ "./src/app/items/item-manager/item-manager.component.css":
/*!***************************************************************!*\
  !*** ./src/app/items/item-manager/item-manager.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/items/item-manager/item-manager.component.html":
/*!****************************************************************!*\
  !*** ./src/app/items/item-manager/item-manager.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl mt-2\">\n  <div class=\"columns col-oneline\">\n    <!-- Title -->\n    <div class=\"column col-auto\"><h3>Items</h3></div>\n\n    <div class=\"column\">\n      <button\n        class=\"btn\"\n        (click)=\"addItem()\"\n        [ngClass]=\"{ loading: creatingItem }\"\n      >\n        <i class=\"icon icon-plus\"></i>\n      </button>\n    </div>\n\n    <!-- Search -->\n    <div class=\"column col-6 col-ml-auto\">\n      <div class=\"has-icon-left\">\n        <input\n          class=\"form-input\"\n          type=\"text\"\n          name=\"search\"\n          id=\"search\"\n          placeholder=\"Search\"\n          [formControl]=\"searchControl\"\n        />\n        <i class=\"form-icon icon icon-search\"></i>\n      </div>\n    </div>\n  </div>\n\n  <div *ngFor=\"let item of filteredItems\">\n    <dd-item-view-list\n      [item]=\"item\"\n      (click)=\"selectItem(item)\"\n    ></dd-item-view-list>\n  </div>\n\n  <dd-paginator\n    [totalItems]=\"searchedItems.length\"\n    [itemsPerPage]=\"itemsPerPage\"\n    [page]=\"page\"\n    (pageChange)=\"page = $event\"\n  ></dd-paginator>\n\n  <div class=\"empty\" *ngIf=\"items.length === 0\">\n    <div class=\"empty-icon\"><i class=\"icon icon-search icon-4x\"></i></div>\n    <p class=\"empty-title h5\">There are no items</p>\n    <p class=\"empty-subtitle\">Click the button to create one</p>\n    <div class=\"empty-action\">\n      <button class=\"btn btn-primary\">Create Item</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/item-manager/item-manager.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/items/item-manager/item-manager.component.ts ***!
  \**************************************************************/
/*! exports provided: ItemManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemManagerComponent", function() { return ItemManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_campaign_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var src_app_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/item.service */ "./src/app/item.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ItemManagerComponent = /** @class */ (function () {
    function ItemManagerComponent(campaignService, router, route, itemService) {
        this.campaignService = campaignService;
        this.router = router;
        this.route = route;
        this.itemService = itemService;
        this.page = 1;
        this.itemsPerPage = 10;
        this.creatingItem = false;
    }
    ItemManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null);
        this.searchControl.valueChanges.subscribe(function (search) {
            if (!search) {
                _this.search = '';
                return;
            }
            _this.search = search.trim().toLowerCase();
        });
    };
    ItemManagerComponent.prototype.addItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item, id, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.creatingItem = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        item = {
                            id: null,
                            name: '--_blank_--',
                            description: '--_blank_--',
                            imageId: 'uncertainty',
                            attributes: [],
                        };
                        return [4 /*yield*/, this.itemService.createItem()];
                    case 2:
                        id = _a.sent();
                        this.router.navigate([id, 'edit'], { relativeTo: this.route });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('ADD ERR', err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.creatingItem = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemManagerComponent.prototype.selectItem = function (item) {
        this.router.navigate([item.id, 'edit'], { relativeTo: this.route });
    };
    Object.defineProperty(ItemManagerComponent.prototype, "items", {
        get: function () {
            return this.campaignService.campaign.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemManagerComponent.prototype, "searchedItems", {
        get: function () {
            var _this = this;
            if (this.search && this.search !== '') {
                return this.items.slice().filter(function (i) {
                    return (i.name.toLowerCase().indexOf(_this.search) !== -1 ||
                        i.description.toLowerCase().indexOf(_this.search) !== -1);
                });
            }
            else {
                return this.items;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemManagerComponent.prototype, "filteredItems", {
        get: function () {
            return this.searchedItems.slice(this.page * this.itemsPerPage - this.itemsPerPage, this.page * this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    ItemManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-item-manager',
            template: __webpack_require__(/*! ./item-manager.component.html */ "./src/app/items/item-manager/item-manager.component.html"),
            styles: [__webpack_require__(/*! ./item-manager.component.css */ "./src/app/items/item-manager/item-manager.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_campaign_service__WEBPACK_IMPORTED_MODULE_3__["CampaignService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            src_app_item_service__WEBPACK_IMPORTED_MODULE_4__["ItemService"]])
    ], ItemManagerComponent);
    return ItemManagerComponent;
}());



/***/ }),

/***/ "./src/app/items/item-view-list/item-view-list.component.html":
/*!********************************************************************!*\
  !*** ./src/app/items/item-view-list/item-view-list.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"columns hoverable p-1\">\n  <div class=\"column col-auto\">\n    <figure class=\"avatar avatar-lg\" *ngIf=\"item.imageId\">\n      <img\n        src=\"https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/{{\n          item.imageId\n        }}.png\"\n      />\n    </figure>\n  </div>\n  <div class=\"column d-flex flex-col\">\n    <h5 class=\"mb-0\">{{ item.name }}</h5>\n    <span class=\"text-gray\">{{ item.description | truncate: 150 }}</span>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/items/item-view-list/item-view-list.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/items/item-view-list/item-view-list.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/items/item-view-list/item-view-list.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/items/item-view-list/item-view-list.component.ts ***!
  \******************************************************************/
/*! exports provided: ItemViewListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemViewListComponent", function() { return ItemViewListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ItemViewListComponent = /** @class */ (function () {
    function ItemViewListComponent() {
    }
    ItemViewListComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(ItemViewListComponent.prototype, "imageURL", {
        get: function () {
            if (this.item.imageId) {
                return "https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/" + this.item.imageId + ".png";
            }
            else {
                return 'https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/uncertainty.png';
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ItemViewListComponent.prototype, "item", void 0);
    ItemViewListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-item-view-list',
            template: __webpack_require__(/*! ./item-view-list.component.html */ "./src/app/items/item-view-list/item-view-list.component.html"),
            styles: [__webpack_require__(/*! ./item-view-list.component.scss */ "./src/app/items/item-view-list/item-view-list.component.scss")],
        }),
        __metadata("design:paramtypes", [])
    ], ItemViewListComponent);
    return ItemViewListComponent;
}());



/***/ }),

/***/ "./src/app/logged-in.guard.ts":
/*!************************************!*\
  !*** ./src/app/logged-in.guard.ts ***!
  \************************************/
/*! exports provided: LoggedInGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggedInGuard", function() { return LoggedInGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var LoggedInGuard = /** @class */ (function () {
    function LoggedInGuard(login, router) {
        this.login = login;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function (next, state) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoggedIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.login.isLoggedIn()];
                    case 1:
                        isLoggedIn = _a.sent();
                        if (!isLoggedIn) {
                            this.router.navigate(['login']);
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoggedInGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoggedInGuard);
    return LoggedInGuard;
}());



/***/ }),

/***/ "./src/app/login-page.guard.ts":
/*!*************************************!*\
  !*** ./src/app/login-page.guard.ts ***!
  \*************************************/
/*! exports provided: LoginPageGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageGuard", function() { return LoginPageGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.service */ "./src/app/login.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var LoginPageGuard = /** @class */ (function () {
    function LoginPageGuard(login, router) {
        this.login = login;
        this.router = router;
    }
    LoginPageGuard.prototype.canActivate = function (next, state) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoggedIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.login.isLoggedIn()];
                    case 1:
                        isLoggedIn = _a.sent();
                        if (isLoggedIn) {
                            this.router.navigate(['home']);
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPageGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginPageGuard);
    return LoginPageGuard;
}());



/***/ }),

/***/ "./src/app/login.service.ts":
/*!**********************************!*\
  !*** ./src/app/login.service.ts ***!
  \**********************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var auth0_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! auth0-js */ "./node_modules/auth0-js/dist/auth0.min.esm.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _action_queue_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./action-queue.service */ "./src/app/action-queue.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var LoginService = /** @class */ (function () {
    function LoginService(userService, router, actions) {
        this.userService = userService;
        this.router = router;
        this.actions = actions;
        this.loginCompleted = false;
        this.loginInProgress = false;
    }
    LoginService.prototype.getAuth = function () {
        if (this.auth === undefined) {
            this.auth = new auth0_js__WEBPACK_IMPORTED_MODULE_1__["WebAuth"]({
                domain: src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].auth0Domain,
                clientID: src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].auth0ClientId,
                responseType: 'token',
                redirectUri: location.protocol + "//" + location.host + "/callback",
                audience: 'https://dd.panchem.io',
            });
        }
        return this.auth;
    };
    LoginService.prototype.resetLoginStatus = function () {
        this.loginPromise = undefined;
        this.loginInProgress = false;
        this.loginCompleted = false;
    };
    LoginService.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.loginPromise === undefined) {
                    this.loginPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var token, userInfo, user, err_1, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.loginInProgress = true;
                                    token = this.loadToken();
                                    if (token === null) {
                                        resolve(false);
                                        this.loginInProgress = false;
                                        return [2 /*return*/];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 7, , 8]);
                                    return [4 /*yield*/, this.getUserInfo(token)];
                                case 2:
                                    userInfo = _a.sent();
                                    this.authData = userInfo;
                                    user = void 0;
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, this.userService.getUser(this.authData.sub)];
                                case 4:
                                    user = _a.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    err_1 = _a.sent();
                                    if (err_1 instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpErrorResponse"]) {
                                        if (err_1.status === 404) {
                                            this.loginInProgress = false;
                                            this.actions.queue.push({
                                                type: _action_queue_service__WEBPACK_IMPORTED_MODULE_6__["ActionType"].ACCOUNT_SETUP,
                                                data: {},
                                            });
                                            this.actions.save();
                                            this.router.navigate(['register']);
                                            resolve(false);
                                            return [2 /*return*/];
                                        }
                                        else {
                                            throw err_1;
                                        }
                                    }
                                    else {
                                        throw err_1;
                                    }
                                    return [3 /*break*/, 6];
                                case 6:
                                    this.userData = user;
                                    this.loginCompleted = true;
                                    resolve(true);
                                    return [3 /*break*/, 8];
                                case 7:
                                    err_2 = _a.sent();
                                    console.log('AUTH ERR', err_2);
                                    localStorage.removeItem('auth-token');
                                    resolve(false);
                                    return [3 /*break*/, 8];
                                case 8:
                                    this.loginInProgress = false;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, this.loginPromise];
            });
        });
    };
    LoginService.prototype.getUserInfo = function (token) {
        var auth = this.getAuth();
        return new Promise(function (resolve, reject) {
            auth.client.userInfo(token, function (err, res) {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };
    LoginService.prototype.saveToken = function (token) {
        localStorage.setItem('auth-token', token);
    };
    LoginService.prototype.loadToken = function () {
        var token = localStorage.getItem('auth-token');
        return token;
    };
    LoginService.prototype.authorize = function (connection) {
        var auth = this.getAuth();
        auth.authorize({
            connection: connection,
        });
    };
    LoginService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.removeItem('auth-token');
                this.loginCompleted = false;
                this.loginInProgress = false;
                this.loginPromise = undefined;
                return [2 /*return*/];
            });
        });
    };
    LoginService.prototype.process = function (hash, state) {
        var auth = this.getAuth();
        return new Promise(function (resolve, reject) {
            auth.parseHash({
                hash: hash,
                state: state,
            }, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    LoginService.prototype.setUserData = function (userData) {
        this.userData = userData;
    };
    Object.defineProperty(LoginService.prototype, "user", {
        get: function () {
            return this.userData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "loggedIn", {
        get: function () {
            return this.loginCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginService.prototype, "id", {
        get: function () {
            return this.authData.sub;
        },
        enumerable: true,
        configurable: true
    });
    LoginService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _action_queue_service__WEBPACK_IMPORTED_MODULE_6__["ActionQueueService"]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".wide {\n  width: 100%;\n}\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <div class=\"columns\">\n    <div class=\"column col-5 col-md-8 col-sm-11 col-mx-auto\">\n      <!-- Login Buttons -->\n      <div class=\"card text-center\" *ngIf=\"!processing\">\n        <div class=\"card-header\"><h2>Login</h2></div>\n        <div class=\"card-body\">\n          <button class=\"btn btn-lg btn-primary wide\" (click)=\"authGoog()\">Google</button>\n          <div class=\"divider\" data-content=\"OR\"></div>\n          <button class=\"btn btn-lg btn-primary wide\" (click)=\"authFb()\">Facebook</button>\n        </div>\n      </div>\n\n      <!-- Loading Indicator -->\n      <div class=\"card text-center\" *ngIf=\"processing\">\n        <div class=\"card-body\">\n          <h6>Processing Information...</h6>\n          <div class=\"loading\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(login, router, route) {
        this.login = login;
        this.router = router;
        this.route = route;
        this.processing = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mode, auth, loginSuccess, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mode = this.route.snapshot.url[0].path;
                        if (!(mode === 'callback')) return [3 /*break*/, 6];
                        this.processing = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.login.process(window.location.hash, null)];
                    case 2:
                        auth = _a.sent();
                        this.login.saveToken(auth.accessToken);
                        return [4 /*yield*/, this.login.isLoggedIn()];
                    case 3:
                        loginSuccess = _a.sent();
                        if (loginSuccess) {
                            this.router.navigate(['home']);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log('Process ERR', err_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.processing = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.authGoog = function () {
        this.login.authorize('google-oauth2');
    };
    LoginComponent.prototype.authFb = function () {
        this.login.authorize('facebook');
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")],
        }),
        __metadata("design:paramtypes", [_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/register/register.component.css":
/*!*******************************************************!*\
  !*** ./src/app/login/register/register.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/register/register.component.html":
/*!********************************************************!*\
  !*** ./src/app/login/register/register.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container grid-xl\">\n  <div class=\"columns\">\n    <div class=\"column col-6 col-md-8 col-sm-12 col-mx-auto\">\n      <div class=\"card\">\n        <div class=\"card-header\">\n          <h3 class=\"mb-0\">Username</h3>\n          <span class=\"text-gray text-italic\">What should we call you?</span>\n        </div>\n        <div class=\"card-body\">\n          <form (ngSubmit)=\"submit()\">\n            <div\n              class=\"form-group\"\n              [ngClass]=\"{\n                'has-error': usernameControl.invalid && (usernameControl.touched || usernameControl.dirty),\n                'has-success': usernameControl.valid\n              }\"\n            >\n              <input\n                type=\"text\"\n                name=\"username\"\n                id=\"username\"\n                [formControl]=\"usernameControl\"\n                class=\"form-input\"\n                placeholder=\"Jimbo\"\n              />\n            </div>\n          </form>\n        </div>\n\n        <div class=\"card-footer\">\n          <button\n            class=\"btn btn-primary float-right\"\n            [ngClass]=\"{ loading: loading }\"\n            [disabled]=\"usernameControl.invalid\"\n            (click)=\"submit()\"\n          >\n            Done <i class=\"icon icon-arrow-right\"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/register/register.component.ts":
/*!******************************************************!*\
  !*** ./src/app/login/register/register.component.ts ***!
  \******************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/user.service */ "./src/app/user.service.ts");
/* harmony import */ var src_app_action_queue_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/action-queue.service */ "./src/app/action-queue.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(login, userService, router, action) {
        this.login = login;
        this.userService = userService;
        this.router = router;
        this.action = action;
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.usernameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3),
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(30),
        ]);
    };
    RegisterComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.usernameControl.valid) return [3 /*break*/, 5];
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.createUser({
                                id: this.login.id,
                                username: this.usernameControl.value,
                                pictureURl: this.login.authData.picture,
                            })];
                    case 2:
                        newUser = _a.sent();
                        this.login.setUserData(newUser);
                        this.login.resetLoginStatus();
                        this.action.queue.pop();
                        this.action.save();
                        this.router.navigate(['home']);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('REGISTER ERR', err_1);
                        this.router.navigate(['home']);
                        return [3 /*break*/, 4];
                    case 4:
                        this.loading = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/login/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/login/register/register.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"],
            src_app_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            src_app_action_queue_service__WEBPACK_IMPORTED_MODULE_5__["ActionQueueService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/modal/modal.component.css":
/*!*******************************************!*\
  !*** ./src/app/modal/modal.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modal/modal.component.html":
/*!********************************************!*\
  !*** ./src/app/modal/modal.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"modal\"\n  [ngClass]=\"{\n    active: isOpen,\n    'modal-sm': size === 'small',\n    'modal-lg': size === 'large'\n  }\"\n>\n  <a (click)=\"close()\" class=\"modal-overlay\" aria-label=\"Close\"></a>\n  <div class=\"modal-container\">\n    <div class=\"modal-header\">\n      <a\n        (click)=\"close()\"\n        class=\"btn btn-clear float-right\"\n        aria-label=\"Close\"\n      ></a>\n      <ng-content select=\"[modal-header]\"></ng-content>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"content\"><ng-content select=\"[modal-body]\"></ng-content></div>\n    </div>\n    <div class=\"modal-footer\">\n      <ng-content select=\"[modal-footer]\"></ng-content>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/modal/modal.component.ts":
/*!******************************************!*\
  !*** ./src/app/modal/modal.component.ts ***!
  \******************************************/
/*! exports provided: ModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.size = 'normal';
    }
    ModalComponent.prototype.ngOnInit = function () { };
    ModalComponent.prototype.open = function () {
        var _this = this;
        if (this.openPromise !== undefined) {
            throw new Error('Cannot open modal when it is already open');
        }
        this.openPromise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
        });
        return this.openPromise;
    };
    ModalComponent.prototype.close = function (val) {
        if (this.openPromise === undefined) {
            throw new Error('Cannot close modal when it has not been opened');
        }
        var prom = this.openPromise;
        this.resolve(val);
        this.openPromise = undefined;
        this.resolve = undefined;
        return prom;
    };
    Object.defineProperty(ModalComponent.prototype, "isOpen", {
        get: function () {
            return this.openPromise !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "size", void 0);
    ModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-modal',
            template: __webpack_require__(/*! ./modal.component.html */ "./src/app/modal/modal.component.html"),
            styles: [__webpack_require__(/*! ./modal.component.css */ "./src/app/modal/modal.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], ModalComponent);
    return ModalComponent;
}());



/***/ }),

/***/ "./src/app/nav/nav.component.css":
/*!***************************************!*\
  !*** ./src/app/nav/nav.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg-gray mb-2\">\n  <div class=\"container grid-xl py-2\">\n    <header class=\"navbar\">\n      <section class=\"navbar-section\" *ngIf=\"!loggedIn && !loginInProgress\">\n        <a [routerLink]=\"['login']\" class=\"btn btn-link\">Login</a>\n      </section>\n      <section class=\"navbar-section\" *ngIf=\"loggedIn || loginInProgress\">\n        <a href=\"#\" class=\"btn btn-link\">Characters</a>\n        <a [routerLink]=\"['campaigns', 'list']\" class=\"btn btn-link\"\n          >Campaigns</a\n        >\n        <button (click)=\"logOut()\" class=\"btn btn-link\">Logout</button>\n      </section>\n      <section class=\"navbar-center\">\n        <a [routerLink]=\"['home']\">\n          <img src=\"/assets/logo.svg\" width=\"32\" />\n        </a>\n      </section>\n      <section class=\"navbar-section\" *ngIf=\"campaign !== null\">\n        <a\n          class=\"btn btn-link\"\n          [routerLink]=\"['campaigns', campaign.id, 'landing']\"\n        >\n          {{ campaign.name }}\n        </a>\n        <a\n          [routerLink]=\"['campaign', 'manage', campaign.id, 'items']\"\n          class=\"btn btn-link\"\n          >Items</a\n        >\n        <a href=\"#\" class=\"btn btn-link\">Places</a>\n        <a\n          [routerLink]=\"['campaign', 'manage', campaign.id, 'quests']\"\n          class=\"btn btn-link\"\n          >Quests</a\n        >\n        <a class=\"btn btn-link\">Sessions</a>\n        <a [routerLink]=\"['campaign', 'manage', campaign.id, 'settings']\"\n          ><i class=\"icon icon-menu\"></i\n        ></a>\n      </section>\n      <section\n        class=\"navbar-section\"\n        *ngIf=\"campaign === null && (loggedIn || loginInProgress)\"\n      >\n        <div class=\"loading\" *ngIf=\"loadingCampaign\"></div>\n        <span class=\"text-grey text-italic mr-2\" *ngIf=\"!loadingCampaign\"\n          >No campaign selected</span\n        >\n      </section>\n      <section\n        class=\"navbar-section\"\n        *ngIf=\"!loggedIn && !loginInProgress\"\n      ></section>\n    </header>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _campaign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../campaign.service */ "./src/app/campaign.service.ts");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login.service */ "./src/app/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavComponent = /** @class */ (function () {
    function NavComponent(campaignService, login, router) {
        this.campaignService = campaignService;
        this.login = login;
        this.router = router;
    }
    NavComponent.prototype.ngOnInit = function () { };
    NavComponent.prototype.logOut = function () {
        this.login.logout();
        this.router.navigate(['login']);
    };
    Object.defineProperty(NavComponent.prototype, "loadingCampaign", {
        get: function () {
            return this.campaignService.loadingCampaign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavComponent.prototype, "campaign", {
        get: function () {
            return this.campaignService.campaign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavComponent.prototype, "loggedIn", {
        get: function () {
            return this.login.loggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavComponent.prototype, "loginInProgress", {
        get: function () {
            return this.login.loginInProgress;
        },
        enumerable: true,
        configurable: true
    });
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/nav/nav.component.css")],
        }),
        __metadata("design:paramtypes", [_campaign_service__WEBPACK_IMPORTED_MODULE_1__["CampaignService"],
            _login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/paginator/paginator.component.css":
/*!***************************************************!*\
  !*** ./src/app/paginator/paginator.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pagination {\n  justify-content: center;\n}\n"

/***/ }),

/***/ "./src/app/paginator/paginator.component.html":
/*!****************************************************!*\
  !*** ./src/app/paginator/paginator.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul class=\"pagination\">\n  <li class=\"page-item\">\n    <button class=\"btn btn-link\" (click)=\"prev()\" [disabled]=\"!canPrev\">\n      <i class=\"icon icon-arrow-left\"></i>\n    </button>\n  </li>\n  <li class=\"page-item\" *ngFor=\"let p of pageArr\">\n    <button\n      class=\"btn\"\n      [ngClass]=\"{ 'btn-primary': page === p, 'btn-link': page !== p }\"\n      (click)=\"setPage(p)\"\n    >\n      {{ p }}\n    </button>\n  </li>\n  <li class=\"page-item\">\n    <button class=\"btn btn-link\" (click)=\"next()\" [disabled]=\"!canNext\">\n      <i class=\"icon icon-arrow-right\"></i>\n    </button>\n  </li>\n</ul>\n"

/***/ }),

/***/ "./src/app/paginator/paginator.component.ts":
/*!**************************************************!*\
  !*** ./src/app/paginator/paginator.component.ts ***!
  \**************************************************/
/*! exports provided: PaginatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatorComponent", function() { return PaginatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent() {
        this.itemsPerPage = 5;
        this.page = 0;
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PaginatorComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(PaginatorComponent.prototype, "numPages", {
        get: function () {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    PaginatorComponent.prototype.next = function () {
        if (this.canNext) {
            this.page++;
            this.pageChange.emit(this.page);
        }
    };
    PaginatorComponent.prototype.prev = function () {
        if (this.canPrev) {
            this.page--;
            this.pageChange.emit(this.page);
        }
    };
    PaginatorComponent.prototype.setPage = function (page) {
        this.page = page;
        this.pageChange.emit(this.page);
    };
    Object.defineProperty(PaginatorComponent.prototype, "pageArr", {
        get: function () {
            var pageArr = [];
            for (var i = 1; i < this.numPages + 1; i++) {
                pageArr.push(i);
            }
            return pageArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "canNext", {
        get: function () {
            return this.page < this.numPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "canPrev", {
        get: function () {
            return this.page > 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PaginatorComponent.prototype, "totalItems", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PaginatorComponent.prototype, "itemsPerPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PaginatorComponent.prototype, "page", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PaginatorComponent.prototype, "pageChange", void 0);
    PaginatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-paginator',
            template: __webpack_require__(/*! ./paginator.component.html */ "./src/app/paginator/paginator.component.html"),
            styles: [__webpack_require__(/*! ./paginator.component.css */ "./src/app/paginator/paginator.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], PaginatorComponent);
    return PaginatorComponent;
}());



/***/ }),

/***/ "./src/app/quest/quest-form/quest-form.component.css":
/*!***********************************************************!*\
  !*** ./src/app/quest/quest-form/quest-form.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/quest/quest-form/quest-form.component.html":
/*!************************************************************!*\
  !*** ./src/app/quest/quest-form/quest-form.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  quest-form works!\n</p>\n"

/***/ }),

/***/ "./src/app/quest/quest-form/quest-form.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/quest/quest-form/quest-form.component.ts ***!
  \**********************************************************/
/*! exports provided: QuestFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestFormComponent", function() { return QuestFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuestFormComponent = /** @class */ (function () {
    function QuestFormComponent() {
    }
    QuestFormComponent.prototype.ngOnInit = function () {
    };
    QuestFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-quest-form',
            template: __webpack_require__(/*! ./quest-form.component.html */ "./src/app/quest/quest-form/quest-form.component.html"),
            styles: [__webpack_require__(/*! ./quest-form.component.css */ "./src/app/quest/quest-form/quest-form.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], QuestFormComponent);
    return QuestFormComponent;
}());



/***/ }),

/***/ "./src/app/quest/quest-manager/quest-manager.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/quest/quest-manager/quest-manager.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/quest/quest-manager/quest-manager.component.html":
/*!******************************************************************!*\
  !*** ./src/app/quest/quest-manager/quest-manager.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading loading-lg\" *ngIf=\"loading\"></div>\n<div class=\"container grid-xl\" *ngIf=\"quests\">\n  <h3>Quests</h3>\n\n  <!-- Quest List -->\n  <div *ngFor=\"let q of quests\">\n    <div class=\"card p-2 hoverable mb-2\">\n      <h4 class=\"mb-0\">{{ q.name }}</h4>\n      <span class=\"text-gray\">{{ q.description | truncate: 150 }}</span>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/quest/quest-manager/quest-manager.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/quest/quest-manager/quest-manager.component.ts ***!
  \****************************************************************/
/*! exports provided: QuestManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestManagerComponent", function() { return QuestManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var QuestManagerComponent = /** @class */ (function () {
    function QuestManagerComponent() {
        this.loading = false;
    }
    QuestManagerComponent.prototype.ngOnInit = function () {
        this.loadQuests();
    };
    QuestManagerComponent.prototype.loadQuests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loading = true;
                try {
                    // const resp = await this.rpc.dd.getQuests({});
                    // this.quests = resp.quests;
                }
                catch (err) {
                    console.log('LOAD ERR', err);
                }
                this.loading = false;
                return [2 /*return*/];
            });
        });
    };
    QuestManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dd-quest-manager',
            template: __webpack_require__(/*! ./quest-manager.component.html */ "./src/app/quest/quest-manager/quest-manager.component.html"),
            styles: [__webpack_require__(/*! ./quest-manager.component.css */ "./src/app/quest/quest-manager/quest-manager.component.css")],
        }),
        __metadata("design:paramtypes", [])
    ], QuestManagerComponent);
    return QuestManagerComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/*!*********************************!*\
  !*** ./src/app/user.service.ts ***!
  \*********************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUser = function (id) {
        return this.http
            .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/users/" + id)
            .toPromise();
    };
    UserService.prototype.createUser = function (user) {
        return this.http
            .post(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/users", user)
            .toPromise();
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    auth0Domain: 'panch-dd.auth0.com',
    auth0ClientId: 'wtWPWeaJjR4hbWYi4hJuduRDDFVn97Fn',
    apiURL: 'http://localhost:5000/api',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/circleci/dd/ui/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map