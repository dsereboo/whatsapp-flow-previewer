// WhatsApp Flow JSON Schema v5.0
// Based on official WhatsApp Business Platform documentation
// Supports Flow JSON versions 2.1, 3.0, 3.1, 4.0, and 5.0
//
// ROUTING MODEL GUIDE:
// ===================
// The routing_model is REQUIRED ONLY when using a Data Endpoint (data_channel_uri).
// Without an endpoint, the routing model is auto-generated from navigate actions.
//
// ROUTING MODEL RULES:
// 1. Define FORWARD routes only (don't define bidirectional edges)
// 2. Maximum 10 total branches/connections across entire routing model
// 3. Routes cannot point to the current screen (but can refresh for validation)
// 4. BACK button automatically works between connected screens
// 5. Terminal screens (terminal: true) should have empty routes: []
// 6. Must have exactly ONE entry screen (screen with no inbound edges)
// 7. All routes must eventually lead to a terminal screen
//
// EXAMPLE ROUTING MODEL:
// {
//   "routing_model": {
//     "ITEM_CATALOG": ["ITEM_DETAILS"],           // Entry screen (no inbound)
//     "ITEM_DETAILS": ["ITEM_CATALOG", "CHECKOUT"], // Can go to 2 screens
//     "CHECKOUT": ["PAYMENT"],                    // Forward to payment
//     "PAYMENT": ["CONFIRMATION"],                // Forward to confirmation
//     "CONFIRMATION": []                          // Terminal screen (empty array)
//   },
//   "screens": [
//     { "id": "ITEM_CATALOG", ... },
//     { "id": "ITEM_DETAILS", ... },
//     { "id": "CHECKOUT", ... },
//     { "id": "PAYMENT", ... },
//     { "id": "CONFIRMATION", "terminal": true, ... }  // Mark as terminal
//   ]
// }
//
// WHEN TO USE ROUTING MODEL:
// - Using data_channel_uri (Data Endpoint): REQUIRED
// - No Data Endpoint: OPTIONAL (auto-generated from navigate actions)

export const whatsappFlowSchemaV2 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "WhatsApp Flow JSON",
  description:
    "Complete schema for WhatsApp Business Flows with all components and features",
  type: "object",
  required: ["version", "screens"],
  additionalProperties: false,
  properties: {
    version: {
      type: "string",
      enum: ["2.1", "3.0", "3.1", "4.0", "5.0","6.0" ,"7.2"],
      description:
        "Flow JSON version. Use 5.0 for latest features including conditional logic and dynamic actions.",
    },
    data_api_version: {
      type: "string",
      enum: ["3.0"],
      description: "Data Exchange API version for external data endpoints",
    },
    data_channel_uri: {
      type: "string",
      format: "uri",
      description: "Endpoint URL for data exchange (must be HTTPS)",
    },
    routing_model: {
      type: "object",
      description:
        "Directed graph defining forward navigation paths between screens. Required ONLY when using a Data Endpoint. Auto-generated if not using endpoints. Maximum 10 branches/connections total.",
      additionalProperties: false,
      patternProperties: {
        "^[A-Z][A-Z0-9_]*$": {
          type: "array",
          description:
            "Array of screen IDs this screen can navigate to (forward routes only). Empty array [] for terminal screens with no forward navigation.",
          uniqueItems: true,
          maxItems: 10,
          items: {
            type: "string",
            pattern: "^[A-Z][A-Z0-9_]*$",
            description:
              "Target screen ID (must match a screen.id in the screens array)",
          },
        },
      },
    },
    screens: {
      type: "array",
      description: "Array of screen definitions",
      minItems: 1,
      maxItems: 50,
      items: {
        $ref: "#/definitions/Screen",
      },
    },
  },
  definitions: {
    Screen: {
      type: "object",
      description: "Individual screen in the flow",
      required: ["id", "title", "data", "layout"],
      additionalProperties: false,
      properties: {
        id: {
          type: "string",
          description: "Unique screen identifier (UPPERCASE_WITH_UNDERSCORES)",
          pattern: "^[A-Z][A-Z0-9_]*$",
          minLength: 1,
          maxLength: 50,
        },
        title: {
          type: "string",
          description: "Screen title shown in header (max 40 characters)",
          minLength: 1,
          maxLength: 40,
        },
        terminal: {
          type: "boolean",
          description: "If true, this is a terminal screen (flow ends here)",
          default: false,
        },
        success: {
          type: "boolean",
          description:
            "If true (with terminal), shows success state. Requires terminal: true",
          default: false,
        },
        refresh_on_back: {
          type: "boolean",
          description:
            "If true, triggers data_exchange when navigating back to this screen",
          default: false,
        },
        data: {
          type: "object",
          description:
            "Screen-level data model - defines variables available on this screen",
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
                  description: "Example value for testing and development",
                },
                default: {
                  description: "Default value if not provided by data exchange",
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
          additionalProperties: false,
          properties: {
            type: {
              type: "string",
              enum: ["SingleColumnLayout"],
              description:
                "Layout type (currently only SingleColumnLayout supported)",
            },
            children: {
              type: "array",
              description: "Components displayed on this screen",
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
        "Base component definition - must be one of the specific component types",
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
        { $ref: "#/definitions/If" },
        { $ref: "#/definitions/Switch" },
      ],
    },
    TextHeading: {
      type: "object",
      description: "Large heading text (24sp, bold)",
      required: ["type", "text"],
      additionalProperties: false,
      properties: {
        type: { const: "TextHeading" },
        text: {
          type: "string",
          description:
            "Heading text. Supports ${data.variable} and ${form.field} syntax",
          minLength: 1,
          maxLength: 80,
        },
        visible: {
          type: ["boolean", "string"],
          description:
            "Visibility. Boolean or expression like ${data.show_header}",
          default: true,
        },
      },
    },
    TextSubheading: {
      type: "object",
      description: "Medium heading (18sp, semi-bold)",
      required: ["type", "text"],
      additionalProperties: false,
      properties: {
        type: { const: "TextSubheading" },
        text: {
          type: "string",
          description: "Subheading text. Supports dynamic data",
          minLength: 1,
          maxLength: 80,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
      },
    },
    TextBody: {
      type: "object",
      description:
        "Body text (16sp, regular). Supports markdown: *bold*, _italic_, ~strikethrough~",
      required: ["type", "text"],
      additionalProperties: false,
      properties: {
        type: { const: "TextBody" },
        text: {
          type: "string",
          description:
            "Body text with markdown support. Use \\n for line breaks",
          minLength: 1,
          maxLength: 4096,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        markdown: {
          type: "boolean",
          description: "Enable markdown formatting",
          default: true,
        },
      },
    },
    TextCaption: {
      type: "object",
      description: "Small caption text (12sp, gray)",
      required: ["type", "text"],
      additionalProperties: false,
      properties: {
        type: { const: "TextCaption" },
        text: {
          type: "string",
          description: "Caption text. Supports dynamic data",
          minLength: 1,
          maxLength: 4096,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
      },
    },
    TextInput: {
      type: "object",
      description: "Single-line text input field",
      required: ["type", "name", "label", "input-type"],
      additionalProperties: false,
      properties: {
        type: { const: "TextInput" },
        name: {
          type: "string",
          description:
            "Field name (lowercase_with_underscores). Used as ${form.name}",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          description: "Field label displayed above input",
          minLength: 1,
          maxLength: 50,
        },
        "input-type": {
          type: "string",
          enum: ["text", "number", "email", "password", "passcode", "phone"],
          description:
            "text: general text, number: numeric keyboard, email: email keyboard, password: masked, passcode: 6-digit code, phone: phone keyboard",
        },
        required: {
          type: "boolean",
          description: "Field must be filled before proceeding",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          description: "Boolean or expression like ${data.show_field}",
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          description: "Whether field can be edited",
          default: true,
        },
        "min-chars": {
          type: "integer",
          minimum: 1,
          maximum: 4096,
          description: "Minimum character count",
        },
        "max-chars": {
          type: "integer",
          minimum: 1,
          maximum: 4096,
          description: "Maximum character count",
        },
        "min-value": {
          type: "number",
          description: "Minimum numeric value (for input-type: number)",
        },
        "max-value": {
          type: "number",
          description: "Maximum numeric value (for input-type: number)",
        },
        "helper-text": {
          type: "string",
          description: "Helper text shown below input",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          description: "Initial value. Supports ${data.variable} syntax",
        },
      },
    },
    TextArea: {
      type: "object",
      description: "Multi-line text input area",
      required: ["type", "name", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "TextArea" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          minLength: 1,
          maxLength: 50,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          default: true,
        },
        "max-length": {
          type: "integer",
          minimum: 1,
          maximum: 3000,
          description: "Maximum character count",
        },
        "helper-text": {
          type: "string",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          description: "Initial value. Supports dynamic data",
        },
      },
    },
    CheckboxGroup: {
      type: "object",
      description: "Multiple selection checkbox group",
      required: ["type", "name", "data-source"],
      additionalProperties: false,
      properties: {
        type: { const: "CheckboxGroup" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          description: "Optional label above checkboxes",
          maxLength: 50,
        },
        "data-source": {
          oneOf: [
            {
              type: "array",
              description: "Static array of options",
              minItems: 1,
              maxItems: 20,
              items: {
                type: "object",
                required: ["id", "title"],
                additionalProperties: false,
                properties: {
                  id: {
                    type: "string",
                    description: "Unique option ID",
                  },
                  title: {
                    type: "string",
                    description: "Display text",
                    maxLength: 30,
                  },
                  description: {
                    type: "string",
                    description: "Optional subtitle",
                    maxLength: 300,
                  },
                  enabled: {
                    type: ["boolean", "string"],
                    description: "Whether option is enabled",
                    default: true,
                  },
                  metadata: {
                    type: "string",
                    description: "Optional metadata (not shown to user)",
                    maxLength: 4096,
                  },
                },
              },
            },
            {
              type: "string",
              description: "Dynamic data source reference: ${data.options}",
              pattern: "^\\$\\{data\\.[a-z_][a-z0-9_]*\\}$",
            },
          ],
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        "min-selected-count": {
          type: "integer",
          minimum: 0,
          maximum: 20,
        },
        "max-selected-count": {
          type: "integer",
          minimum: 1,
          maximum: 20,
        },
        "init-value": {
          type: "array",
          description: "Initially selected option IDs",
          items: { type: "string" },
        },
        "on-select-action": {
          $ref: "#/definitions/Action",
          description: "Action triggered when selection changes",
        },
      },
    },
    RadioButtonsGroup: {
      type: "object",
      description: "Single selection radio button group",
      required: ["type", "name", "data-source"],
      additionalProperties: false,
      properties: {
        type: { const: "RadioButtonsGroup" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          maxLength: 50,
        },
        "data-source": {
          oneOf: [
            {
              type: "array",
              minItems: 2,
              maxItems: 20,
              items: {
                type: "object",
                required: ["id", "title"],
                additionalProperties: false,
                properties: {
                  id: { type: "string" },
                  title: { type: "string", maxLength: 30 },
                  description: { type: "string", maxLength: 300 },
                  enabled: { type: ["boolean", "string"], default: true },
                  metadata: { type: "string", maxLength: 4096 },
                },
              },
            },
            {
              type: "string",
              pattern: "^\\$\\{data\\.[a-z_][a-z0-9_]*\\}$",
            },
          ],
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        "init-value": {
          type: "string",
          description: "Initially selected option ID",
        },
        "on-select-action": {
          $ref: "#/definitions/Action",
        },
      },
    },
    Dropdown: {
      type: "object",
      description: "Dropdown select component",
      required: ["type", "name", "data-source"],
      additionalProperties: false,
      properties: {
        type: { const: "Dropdown" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          maxLength: 50,
        },
        "data-source": {
          oneOf: [
            {
              type: "array",
              minItems: 1,
              maxItems: 200,
              items: {
                type: "object",
                required: ["id", "title"],
                additionalProperties: false,
                properties: {
                  id: { type: "string" },
                  title: { type: "string", maxLength: 30 },
                  enabled: { type: ["boolean", "string"], default: true },
                  metadata: { type: "string", maxLength: 4096 },
                },
              },
            },
            {
              type: "string",
              pattern: "^\\$\\{data\\.[a-z_][a-z0-9_]*\\}$",
            },
          ],
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          default: true,
        },
        "init-value": {
          type: "string",
        },
        "on-select-action": {
          $ref: "#/definitions/Action",
        },
      },
    },
    DatePicker: {
      type: "object",
      description: "Date selection component",
      required: ["type", "name", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "DatePicker" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          maxLength: 50,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          default: true,
        },
        "min-date": {
          type: "string",
          description: "Minimum date (YYYY-MM-DD or ${data.min_date})",
          pattern: "^(\\d{4}-\\d{2}-\\d{2}|\\$\\{data\\.[a-z_][a-z0-9_]*\\})$",
        },
        "max-date": {
          type: "string",
          description: "Maximum date (YYYY-MM-DD or ${data.max_date})",
          pattern: "^(\\d{4}-\\d{2}-\\d{2}|\\$\\{data\\.[a-z_][a-z0-9_]*\\})$",
        },
        "unavailable-dates": {
          oneOf: [
            {
              type: "array",
              description: "Array of unavailable dates (YYYY-MM-DD)",
              items: {
                type: "string",
                pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              },
            },
            {
              type: "string",
              pattern: "^\\$\\{data\\.[a-z_][a-z0-9_]*\\}$",
            },
          ],
        },
        "helper-text": {
          type: "string",
          maxLength: 80,
        },
        "init-value": {
          type: "string",
          description: "Initial date (YYYY-MM-DD or ${data.date})",
          pattern: "^(\\d{4}-\\d{2}-\\d{2}|\\$\\{data\\.[a-z_][a-z0-9_]*\\})$",
        },
      },
    },
    OptIn: {
      type: "object",
      description: "Checkbox with linked text for consent/opt-in",
      required: ["type", "name", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "OptIn" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          description:
            "Text with optional markdown links: [link text](link-id)",
          minLength: 1,
          maxLength: 200,
        },
        required: {
          type: "boolean",
          description: "Must be checked to proceed",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        "on-click-action": {
          type: "object",
          description: "Action when clicking link in label",
          required: ["name", "next"],
          additionalProperties: false,
          properties: {
            name: { const: "navigate" },
            next: {
              type: "object",
              required: ["type", "name"],
              properties: {
                type: { const: "screen" },
                name: { type: "string" },
              },
            },
            payload: {
              type: "object",
            },
          },
        },
        "init-value": {
          type: "boolean",
        },
      },
    },
    Footer: {
      type: "object",
      description:
        "Primary action button (max 1 per screen, must be last component)",
      required: ["type", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "Footer" },
        label: {
          type: "string",
          description: "Button text",
          minLength: 1,
          maxLength: 35,
        },
        "left-caption": {
          type: "string",
          description: "Optional text on left side of footer",
          maxLength: 15,
        },
        "center-caption": {
          type: "string",
          description: "Optional text in center of footer",
          maxLength: 15,
        },
        "on-click-action": {
          $ref: "#/definitions/Action",
          description: "Action when button is clicked",
        },
        enabled: {
          type: ["boolean", "string"],
          description:
            "Whether button is enabled. Use expressions like ${form.email != ''}",
          default: true,
        },
      },
    },
    Form: {
      type: "object",
      description: "Container for form inputs with validation",
      required: ["type", "name", "children"],
      additionalProperties: false,
      properties: {
        type: { const: "Form" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        children: {
          type: "array",
          description: "Form field components",
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
        "error-messages": {
          type: "object",
          description: "Custom error messages for validation",
          patternProperties: {
            "^[a-z_][a-z0-9_]*$": {
              type: "object",
              properties: {
                required: { type: "string" },
                invalid: { type: "string" },
              },
            },
          },
        },
      },
    },
    Image: {
      type: "object",
      description: "Image component",
      required: ["type", "src"],
      additionalProperties: false,
      properties: {
        type: { const: "Image" },
        src: {
          type: "string",
          description:
            "HTTPS URL or ${data.image_url}. Max 5MB. Formats: JPEG, PNG, WebP",
        },
        width: {
          type: "integer",
          minimum: 1,
          maximum: 4096,
          description: "Width in pixels",
        },
        height: {
          type: "integer",
          minimum: 1,
          maximum: 4096,
          description: "Height in pixels",
        },
        "scale-type": {
          type: "string",
          enum: ["cover", "contain"],
          description: "cover: fill and crop, contain: fit within bounds",
          default: "contain",
        },
        "aspect-ratio": {
          type: "number",
          minimum: 0.1,
          maximum: 10,
          description: "Width/height ratio (e.g., 1.5 for 3:2, 0.75 for 3:4)",
        },
        "alt-text": {
          type: "string",
          description: "Accessibility description",
          maxLength: 80,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
      },
    },
    EmbeddedLink: {
      type: "object",
      description: "Clickable text link",
      required: ["type", "text", "on-click-action"],
      additionalProperties: false,
      properties: {
        type: { const: "EmbeddedLink" },
        text: {
          type: "string",
          description: "Link text",
          minLength: 1,
          maxLength: 35,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        "on-click-action": {
          $ref: "#/definitions/Action",
        },
      },
    },
    PhotoPicker: {
      type: "object",
      description: "Component for selecting photos from device",
      required: ["type", "name", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "PhotoPicker" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          maxLength: 50,
        },
        description: {
          type: "string",
          maxLength: 300,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          default: true,
        },
        "min-uploaded-photos": {
          type: "integer",
          minimum: 1,
          maximum: 10,
        },
        "max-uploaded-photos": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          default: 1,
        },
        "max-file-size-kb": {
          type: "integer",
          minimum: 1,
          maximum: 25600,
          description: "Max file size in KB (max 25MB = 25600KB)",
          default: 25600,
        },
      },
    },
    DocumentPicker: {
      type: "object",
      description: "Component for selecting documents",
      required: ["type", "name", "label"],
      additionalProperties: false,
      properties: {
        type: { const: "DocumentPicker" },
        name: {
          type: "string",
          pattern: "^[a-z_][a-z0-9_]*$",
          minLength: 1,
          maxLength: 200,
        },
        label: {
          type: "string",
          maxLength: 50,
        },
        description: {
          type: "string",
          maxLength: 300,
        },
        required: {
          type: "boolean",
          default: false,
        },
        visible: {
          type: ["boolean", "string"],
          default: true,
        },
        enabled: {
          type: ["boolean", "string"],
          default: true,
        },
        "min-uploaded-documents": {
          type: "integer",
          minimum: 1,
          maximum: 10,
        },
        "max-uploaded-documents": {
          type: "integer",
          minimum: 1,
          maximum: 10,
          default: 1,
        },
        "max-file-size-kb": {
          type: "integer",
          minimum: 1,
          maximum: 102400,
          description: "Max file size in KB (max 100MB = 102400KB)",
          default: 102400,
        },
      },
    },
    If: {
      type: "object",
      description:
        "Conditional component - shows children if condition is true (Flow v5.0+)",
      required: ["type", "condition", "then"],
      additionalProperties: false,
      properties: {
        type: { const: "If" },
        condition: {
          type: "string",
          description:
            "Boolean expression like ${data.age >= 18} or ${form.country == 'US'}",
          minLength: 1,
        },
        then: {
          type: "array",
          description: "Components to show if condition is true",
          minItems: 1,
          items: {
            $ref: "#/definitions/Component",
          },
        },
        else: {
          type: "array",
          description: "Optional components to show if condition is false",
          items: {
            $ref: "#/definitions/Component",
          },
        },
      },
    },
    Switch: {
      type: "object",
      description:
        "Switch/case conditional - shows first matching case (Flow v5.0+)",
      required: ["type", "cases"],
      additionalProperties: false,
      properties: {
        type: { const: "Switch" },
        cases: {
          type: "array",
          description: "Array of conditions and their components",
          minItems: 1,
          items: {
            type: "object",
            required: ["condition", "children"],
            properties: {
              condition: {
                type: "string",
                description: "Boolean expression. First true condition wins.",
              },
              children: {
                type: "array",
                description: "Components to show for this case",
                minItems: 1,
                items: {
                  $ref: "#/definitions/Component",
                },
              },
            },
          },
        },
        default: {
          type: "array",
          description: "Optional default components if no case matches",
          items: {
            $ref: "#/definitions/Component",
          },
        },
      },
    },
    Action: {
      type: "object",
      description: "Action triggered by user interaction",
      required: ["name"],
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          enum: ["navigate", "complete", "data_exchange", "update_data"],
          description:
            "navigate: go to screen, complete: end flow, data_exchange: call endpoint, update_data: update screen data",
        },
        next: {
          type: "object",
          description: "Required for navigate action",
          required: ["type", "name"],
          properties: {
            type: {
              const: "screen",
              description: "Target type",
            },
            name: {
              type: "string",
              description: "Screen ID to navigate to",
            },
          },
        },
        payload: {
          type: "object",
          description:
            "Data to send with action. Supports ${form.field} and ${data.variable}",
          additionalProperties: true,
        },
      },
    },
  },
};
