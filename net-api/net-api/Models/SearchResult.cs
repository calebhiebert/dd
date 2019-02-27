using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public abstract class SearchResult
    {
        public ObjectType Type { get; set; }
    }

    public class EntitySearchResult : SearchResult
    {
        public Entity Entity { get; set; }

        public EntitySearchResult(Entity entity)
        {
            Entity = entity;
            Type = ObjectType.Entity;
        }
    }

    public class SpellSearchResult : SearchResult
    {
        public Spell Spell { get; set; }

        public SpellSearchResult(Spell spell)
        {
            Spell = spell;
            Type = ObjectType.Spell;
        }
    }

    public class ItemSearchResult : SearchResult
    {
        public Item Item { get; set; }

        public ItemSearchResult(Item item)
        {
            Item = item;
            Type = ObjectType.Item;
        }
    }

    public class ArticleSearchResult : SearchResult
    {
        public Article Article { get; set; }

        public ArticleSearchResult(Article article)
        {
            Article = article;
            Type = ObjectType.Article;
        }
    }

    public class MapSearchResult : SearchResult
    {
        public MapMini Map { get; set; }

        public MapSearchResult(MapMini map)
        {
            Map = map;
            Type = ObjectType.Map;
        }
    }

    public class QuestSearchResult : SearchResult
    {
        public Quest Quest { get; set; }

        public QuestSearchResult(Quest quest)
        {
            Quest = quest;
            Type = ObjectType.Quest;
        }
    }

    public class UserSearchResult : SearchResult
    {
        public User User { get; set; }

        public UserSearchResult(User user)
        {
            User = user;
            Type = ObjectType.User;
        }
    }

    public enum ObjectType
    {
        Entity, Spell, Item, Article, Map, Quest, User
    }
}
