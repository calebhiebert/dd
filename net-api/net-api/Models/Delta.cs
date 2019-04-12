using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net_api.Models
{
    public class Delta
    {
        [JsonProperty("ops")]
        public Op[] Ops { get; set; }
    }

    public class Op
    {
        [JsonProperty("insert")]
        [JsonConverter(typeof(InsertUnionConverter))]
        public InsertUnion Insert { get; set; }

        [JsonProperty("attributes", NullValueHandling = NullValueHandling.Ignore)]
        public Attributes Attributes { get; set; }
    }

    public partial struct InsertUnion
    {
        public InsertClass InsertClass;
        public string String;

        public static implicit operator InsertUnion(InsertClass InsertClass) => new InsertUnion { InsertClass = InsertClass };
        public static implicit operator InsertUnion(string String) => new InsertUnion { String = String };
    }

    public partial class InsertClass
    {
        [JsonProperty("image", NullValueHandling = NullValueHandling.Ignore)]
        public string Image { get; set; }

        [JsonProperty("mention", NullValueHandling = NullValueHandling.Ignore)]
        public Mention Mention { get; set; }
    }

    public partial class Mention
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("type")]
        public long Type { get; set; }

        [JsonProperty("index")]
        public long Index { get; set; }

        [JsonProperty("value")]
        public string Value { get; set; }

        [JsonProperty("denotationChar")]
        public string DenotationChar { get; set; }

        [JsonProperty("concepttypeid")]
        public Guid Concepttypeid { get; set; }
    }

    public class Attributes
    {
        [JsonProperty("bold", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Bold { get; set; }

        [JsonProperty("italic", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Italic { get; set; }

        [JsonProperty("underline", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Underline { get; set; }

        [JsonProperty("strike", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Strike { get; set; }

        [JsonProperty("blockquote", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Blockquote { get; set; }

        [JsonProperty("code-block", NullValueHandling = NullValueHandling.Ignore)]
        public bool? CodeBlock { get; set; }

        [JsonProperty("width", NullValueHandling = NullValueHandling.Ignore)]
        public double? Width { get; set; }

        [JsonProperty("height", NullValueHandling = NullValueHandling.Ignore)]
        public double? Height { get; set; }

        [JsonProperty("link", NullValueHandling = NullValueHandling.Ignore)]
        public string Link { get; set; }

        [JsonProperty("list", NullValueHandling = NullValueHandling.Ignore)]
        public string List { get; set; }

        [JsonProperty("indent", NullValueHandling = NullValueHandling.Ignore)]
        public long? Indent { get; set; }

        [JsonProperty("script", NullValueHandling = NullValueHandling.Ignore)]
        public string Script { get; set; }

        [JsonProperty("header", NullValueHandling = NullValueHandling.Ignore)]
        public long? Header { get; set; }

        [JsonProperty("color", NullValueHandling = NullValueHandling.Ignore)]
        public string Color { get; set; }

        [JsonProperty("background", NullValueHandling = NullValueHandling.Ignore)]
        public string Background { get; set; }

        [JsonProperty("align", NullValueHandling = NullValueHandling.Ignore)]
        public string Align { get; set; }
    }

    internal class InsertUnionConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(InsertUnion) || t == typeof(InsertUnion?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            switch (reader.TokenType)
            {
                case JsonToken.String:
                case JsonToken.Date:
                    var stringValue = serializer.Deserialize<string>(reader);
                    return new InsertUnion { String = stringValue };
                case JsonToken.StartObject:
                    var objectValue = serializer.Deserialize<InsertClass>(reader);
                    return new InsertUnion { InsertClass = objectValue };
            }
            throw new Exception("Cannot unmarshal type InsertUnion");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            var value = (InsertUnion)untypedValue;
            if (value.String != null)
            {
                serializer.Serialize(writer, value.String);
                return;
            }
            if (value.InsertClass != null)
            {
                serializer.Serialize(writer, value.InsertClass);
                return;
            }
            throw new Exception("Cannot marshal type InsertUnion");
        }

        public static readonly InsertUnionConverter Singleton = new InsertUnionConverter();
    }
}
