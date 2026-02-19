export const whatsappFlowSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "WhatsApp Flow JSON",
  description: "Schema for WhatsApp Business Flows JSON configuration",
  type: "object",
  required: ["version", "screens"],
  properties: {
    version: {
      type: "string",
      enum: ["2.1", "3.0", "3.1", "4.0"],
      description:
        "The Flow JSON version. Use the latest version for new flows.",
    },
    data_api_version: {
      type: "string",
      enum: ["3.0"],
      description:
        "Version of the Data Exchange API for dynamic data endpoints",
    },
    routing_model: {
      type: "object",
      description: "Defines which screens can navigate to which other screens",
      additionalProperties: {
        type: "array",
        items: {
          type: "string",
          description: "Screen ID that can be navigated to",
        },
      },
    },
    screens: {
      type: "array",
      description: "Array of screen definitions that make up the flow",
      minItems: 1,
      items: {
        $ref: "#/definitions/Screen",
      },
    },
  },
  definitions: {
    Screen: {
      type: "object",
      description: "A single screen in the flow",
      required: ["id", "title", "data", "layout"],
      properties: {
        id: {
          type: "string",
          description:
            "Unique screen identifier. Must be uppercase with underscores (e.g., WELCOME_SCREEN)",
          pattern: "^[A-Z][A-Z0-9_]*$",
        },
        title: {
          type: "string",
          description: "Screen title displayed in the header bar",
          maxLength: 40,
        },
        terminal: {
          type: "boolean",
          description: "If true, this is the final screen in the flow",
          default: false,
        },
        success: {
          type: "boolean",
          description:
            "If true (with terminal), shows a success state to the user",
          default: false,
        },
        refresh_on_back: {
          type: "boolean",
          description:
            "If true, refresh screen data when navigating back to it",
          default: false,
        },
        data: {
          type: "object",
          description: "Screen-level data model definitions",
          patternProperties: {
            "^[a-z_][a-z0-9_]*$": {
              type: "object",
              required: ["type"],
              properties: {
                type: {
                  type: "string",
                  enum: ["string", "number", "boolean", "array", "object"],
                  description: "Data type for this variable",
                },
                __example__: {
                  description: "Example value for testing",
                },
                default: {
                  description: "Default value if not provided",
                },
              },
            },
          },
          additionalProperties: false,
        },
        layout: {
          type: "object",
          description: "Screen layout configuration",
          required: ["type", "children"],
          properties: {
            type: {
              type: "string",
              enum: ["SingleColumnLayout"],
              description:
                "Layout type (currently only SingleColumnLayout is supported)",
            },
            children: {
              type: "array",
              description: "Components to display on the screen",
              items: {
                $ref: "#/definitions/Component",
              },
            },
          },
        },
      },
    },
    Component: {
      description:
        "Base component - will be one of the specific component types",
      type: "object",
      required: ["type"],
      oneOf: [
        { $ref: "#/definitions/TextHeading" },
        { $ref: "#/definitions/TextSubheading" },
        { $ref: "#/definitions/TextBody" },
        { $ref: "#/definitions/TextCaption" },
        { $ref: "#/definitions/TextInput" },
        { $ref: "#/definitions/TextArea" },
        { $ref: "#/definitions/CheckboxGroup" },
        { $ref: "#/definitions/RadioButtonsGroup" },
        { $ref: "#/definitions/Dropdown" },
        { $ref: "#/definitions/DatePicker" },
        { $ref: "#/definitions/OptIn" },
        { $ref: "#/definitions/Footer" },
        { $ref: "#/definitions/Form" },
        { $ref: "#/definitions/Image" },
        { $ref: "#/definitions/EmbeddedLink" },
        { $ref: "#/definitions/PhotoPicker" },
        { $ref: "#/definitions/DocumentPicker" },
      ],
    },
    TextHeading: {
      type: "object",
      description: "Large heading text (24sp, bold)",
      required: ["type", "text"],
      properties: {
        type: {
          const: "TextHeading",
          description: "Component type identifier",
        },
        text: {
          type: "string",
          description:
            "Heading text content. Supports dynamic data: ${data.variable_name}",
          maxLength: 80,
        },
        visible: {
          type: "boolean",
          description:
            "Whether the component is visible. Can use dynamic expression.",
          default: true,
        },
      },
      additionalProperties: false,
    },
    TextSubheading: {
      type: "object",
      description: "Medium heading text (18sp, semi-bold)",
      required: ["type", "text"],
      properties: {
        type: {
          const: "TextSubheading",
          description: "Component type identifier",
        },
        text: {
          type: "string",
          description:
            "Subheading text content. Supports dynamic data: ${data.variable_name}",
          maxLength: 80,
        },
        visible: {
          type: "boolean",
          default: true,
        },
      },
      additionalProperties: false,
    },
    TextBody: {
      type: "object",
      description: "Body text (16sp, regular weight)",
      required: ["type", "text"],
      properties: {
        type: {
          const: "TextBody",
          description: "Component type identifier",
        },
        text: {
          type: "string",
          description:
            "Body text content. Supports dynamic data and markdown formatting.",
          maxLength: 4096,
        },
        visible: {
          type: "boolean",
          default: true,
        },
      },
      additionalProperties: false,
    },
    TextCaption: {
      type: "object",
      description: "Small caption text (12sp, gray color)",
      required: ["type", "text"],
      properties: {
        type: {
          const: "TextCaption",
          description: "Component type identifier",
        },
        text: {
          type: "string",
          description: "Caption text content. Supports dynamic data.",
          maxLength: 4096,
        },
        visible: {
          type: "boolean",
          default: true,
        },
      },
      additionalProperties: false,
    },
    TextInput: {
      type: "object",
      description: "Single-line text input field",
      required: ["type", "name", "label", "input-type"],
      properties: {
        type: {
          const: "TextInput",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description:
            "Form field name (lowercase with underscores). Used to reference this field's value.",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Field label displayed above the input",
          maxLength: 50,
        },
        "input-type": {
          type: "string",
          enum: ["text", "number", "email", "password", "passcode", "phone"],
          description:
            "Input type that determines keyboard and validation behavior",
        },
        required: {
          type: "boolean",
          description: "Whether this field must be filled before proceeding",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          description: "Whether the field can be edited",
          default: true,
        },
        "min-chars": {
          type: "integer",
          minimum: 1,
          description: "Minimum number of characters required",
        },
        "max-chars": {
          type: "integer",
          minimum: 1,
          maximum: 4096,
          description: "Maximum number of characters allowed",
        },
        "helper-text": {
          type: "string",
          description: "Helper text displayed below the input field",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          description:
            "Initial value for the field. Supports dynamic data: ${data.variable_name}",
        },
      },
      additionalProperties: false,
    },
    TextArea: {
      type: "object",
      description: "Multi-line text input area",
      required: ["type", "name", "label"],
      properties: {
        type: {
          const: "TextArea",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Field label displayed above the text area",
          maxLength: 50,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          default: true,
        },
        "max-length": {
          type: "integer",
          minimum: 1,
          maximum: 3000,
          description: "Maximum number of characters",
        },
        "helper-text": {
          type: "string",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          description: "Initial value. Supports dynamic data.",
        },
      },
      additionalProperties: false,
    },
    CheckboxGroup: {
      type: "object",
      description: "Multiple selection checkbox group",
      required: ["type", "name", "data-source"],
      properties: {
        type: {
          const: "CheckboxGroup",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Optional label above the checkbox group",
          maxLength: 50,
        },
        "data-source": {
          type: "array",
          description: "Array of checkbox options",
          minItems: 1,
          maxItems: 20,
          items: {
            type: "object",
            required: ["id", "title"],
            properties: {
              id: {
                type: "string",
                description: "Unique option identifier",
              },
              title: {
                type: "string",
                description: "Option display text",
                maxLength: 30,
              },
              description: {
                type: "string",
                description: "Optional description below the title",
                maxLength: 300,
              },
              enabled: {
                type: "boolean",
                description: "Whether this option is enabled",
                default: true,
              },
            },
          },
        },
        required: {
          type: "boolean",
          description: "Whether at least one checkbox must be selected",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        "min-selected-count": {
          type: "integer",
          minimum: 0,
          description: "Minimum number of checkboxes that must be selected",
        },
        "max-selected-count": {
          type: "integer",
          minimum: 1,
          description: "Maximum number of checkboxes that can be selected",
        },
        "init-value": {
          type: "array",
          description: "Initially selected option IDs",
          items: { type: "string" },
        },
      },
      additionalProperties: false,
    },
    RadioButtonsGroup: {
      type: "object",
      description: "Single selection radio button group",
      required: ["type", "name", "data-source"],
      properties: {
        type: {
          const: "RadioButtonsGroup",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Optional label above the radio group",
          maxLength: 50,
        },
        "data-source": {
          type: "array",
          description: "Array of radio button options",
          minItems: 2,
          maxItems: 20,
          items: {
            type: "object",
            required: ["id", "title"],
            properties: {
              id: {
                type: "string",
                description: "Unique option identifier",
              },
              title: {
                type: "string",
                description: "Option display text",
                maxLength: 30,
              },
              description: {
                type: "string",
                description: "Optional description below the title",
                maxLength: 300,
              },
              enabled: {
                type: "boolean",
                default: true,
              },
            },
          },
        },
        required: {
          type: "boolean",
          description: "Whether an option must be selected",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        "init-value": {
          type: "string",
          description: "Initially selected option ID",
        },
      },
      additionalProperties: false,
    },
    Dropdown: {
      type: "object",
      description: "Dropdown select component",
      required: ["type", "name", "data-source"],
      properties: {
        type: {
          const: "Dropdown",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Label above the dropdown",
          maxLength: 50,
        },
        "data-source": {
          type: "array",
          description: "Array of dropdown options",
          minItems: 1,
          maxItems: 200,
          items: {
            type: "object",
            required: ["id", "title"],
            properties: {
              id: {
                type: "string",
                description: "Unique option identifier",
              },
              title: {
                type: "string",
                description: "Option display text",
                maxLength: 30,
              },
              enabled: {
                type: "boolean",
                default: true,
              },
            },
          },
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          default: true,
        },
        "init-value": {
          type: "string",
          description: "Initially selected option ID",
        },
      },
      additionalProperties: false,
    },
    DatePicker: {
      type: "object",
      description: "Date selection component",
      required: ["type", "name", "label"],
      properties: {
        type: {
          const: "DatePicker",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Field label",
          maxLength: 50,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          default: true,
        },
        "min-date": {
          type: "string",
          format: "date",
          description: "Minimum selectable date (YYYY-MM-DD)",
        },
        "max-date": {
          type: "string",
          format: "date",
          description: "Maximum selectable date (YYYY-MM-DD)",
        },
        "unavailable-dates": {
          type: "array",
          description: "Array of unavailable dates (YYYY-MM-DD)",
          items: {
            type: "string",
            format: "date",
          },
        },
        "helper-text": {
          type: "string",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          format: "date",
          description: "Initial selected date (YYYY-MM-DD)",
        },
      },
      additionalProperties: false,
    },
    OptIn: {
      type: "object",
      description: "Checkbox with linked text for opt-in consent",
      required: ["type", "name", "label"],
      properties: {
        type: {
          const: "OptIn",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description:
            "Opt-in text. Use markdown [link text](link-id) for clickable links.",
          maxLength: 200,
        },
        required: {
          type: "boolean",
          description: "Whether the opt-in must be checked",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        "on-click-action": {
          type: "object",
          description: "Action when clicking a link in the label",
          required: ["name", "next"],
          properties: {
            name: {
              const: "navigate",
              description: "Action type",
            },
            next: {
              type: "object",
              required: ["type", "name"],
              properties: {
                type: { const: "screen" },
                name: {
                  type: "string",
                  description: "Screen ID to navigate to",
                },
              },
            },
            payload: {
              type: "object",
              description: "Optional data to pass",
            },
          },
        },
        "init-value": {
          type: "boolean",
          description: "Initially checked state",
        },
      },
      additionalProperties: false,
    },
    Footer: {
      type: "object",
      description: "Bottom action button (max 1 per screen)",
      required: ["type", "label"],
      properties: {
        type: {
          const: "Footer",
          description: "Component type identifier",
        },
        label: {
          type: "string",
          description: "Button text",
          maxLength: 35,
        },
        "on-click-action": {
          type: "object",
          description: "Action when button is clicked",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              enum: ["navigate", "complete", "data_exchange"],
              description:
                "navigate: go to another screen, complete: end flow successfully, data_exchange: call external API",
            },
            next: {
              type: "object",
              description: "Required for 'navigate' action",
              required: ["type", "name"],
              properties: {
                type: {
                  const: "screen",
                  description: "Target type",
                },
                name: {
                  type: "string",
                  description: "Target screen ID",
                },
              },
            },
            payload: {
              type: "object",
              description:
                "Data to send with the action (for data_exchange or navigate)",
            },
          },
        },
        enabled: {
          type: "boolean",
          description:
            "Whether the button is enabled. Can use dynamic expression.",
          default: true,
        },
      },
      additionalProperties: false,
    },
    Form: {
      type: "object",
      description: "Container for form inputs with validation",
      required: ["type", "name", "children"],
      properties: {
        type: {
          const: "Form",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        children: {
          type: "array",
          description:
            "Form input components (TextInput, TextArea, DatePicker, etc.)",
          minItems: 1,
          items: {
            $ref: "#/definitions/Component",
          },
        },
        "init-values": {
          type: "object",
          description: "Initial values for form fields",
          patternProperties: {
            "^[a-z_][a-z0-9_]*$": {},
          },
        },
      },
      additionalProperties: false,
    },
    Image: {
      type: "object",
      description: "Image component",
      required: ["type", "src"],
      properties: {
        type: {
          const: "Image",
          description: "Component type identifier",
        },
        src: {
          type: "string",
          description:
            "Image URL (must be HTTPS) or dynamic data reference: ${data.image_url}",
        },
        width: {
          type: "integer",
          minimum: 1,
          description: "Image width in pixels",
        },
        height: {
          type: "integer",
          minimum: 1,
          description: "Image height in pixels",
        },
        "scale-type": {
          type: "string",
          enum: ["cover", "contain"],
          description: "cover: fill space and crop, contain: fit within space",
          default: "contain",
        },
        "aspect-ratio": {
          type: "number",
          minimum: 0.1,
          maximum: 10,
          description: "Width to height ratio (e.g., 1.5 for 3:2)",
        },
        "alt-text": {
          type: "string",
          description: "Accessibility text description",
          maxLength: 80,
        },
      },
      additionalProperties: false,
    },
    EmbeddedLink: {
      type: "object",
      description: "Clickable link component",
      required: ["type", "text", "on-click-action"],
      properties: {
        type: {
          const: "EmbeddedLink",
          description: "Component type identifier",
        },
        text: {
          type: "string",
          description: "Link text",
          maxLength: 35,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        "on-click-action": {
          type: "object",
          required: ["name", "next"],
          properties: {
            name: {
              const: "navigate",
              description: "Action type",
            },
            next: {
              type: "object",
              required: ["type", "name"],
              properties: {
                type: { const: "screen" },
                name: {
                  type: "string",
                  description: "Screen ID to navigate to",
                },
              },
            },
            payload: {
              type: "object",
            },
          },
        },
      },
      additionalProperties: false,
    },
    PhotoPicker: {
      type: "object",
      description: "Component for selecting photos from device",
      required: ["type", "name", "label"],
      properties: {
        type: {
          const: "PhotoPicker",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Field label",
          maxLength: 50,
        },
        description: {
          type: "string",
          description: "Helper text",
          maxLength: 300,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          default: true,
        },
        "min-uploaded-photos": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          description: "Minimum number of photos required",
        },
        "max-uploaded-photos": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          description: "Maximum number of photos allowed",
          default: 1,
        },
        "max-file-size-kb": {
          type: "integer",
          minimum: 1,
          maximum: 25600,
          description: "Maximum file size per photo in KB (max 25MB)",
          default: 25600,
        },
      },
      additionalProperties: false,
    },
    DocumentPicker: {
      type: "object",
      description: "Component for selecting documents from device",
      required: ["type", "name", "label"],
      properties: {
        type: {
          const: "DocumentPicker",
          description: "Component type identifier",
        },
        name: {
          type: "string",
          description: "Form field name (lowercase with underscores)",
          pattern: "^[a-z_][a-z0-9_]*$",
        },
        label: {
          type: "string",
          description: "Field label",
          maxLength: 50,
        },
        description: {
          type: "string",
          description: "Helper text",
          maxLength: 300,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: "boolean",
          default: true,
        },
        enabled: {
          type: "boolean",
          default: true,
        },
        "min-uploaded-documents": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          description: "Minimum number of documents required",
        },
        "max-uploaded-documents": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          description: "Maximum number of documents allowed",
          default: 1,
        },
        "max-file-size-kb": {
          type: "integer",
          minimum: 1,
          maximum: 102400,
          description: "Maximum file size per document in KB (max 100MB)",
          default: 102400,
        },
      },
      additionalProperties: false,
    },
  },
};
