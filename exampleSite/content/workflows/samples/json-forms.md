---
title: JSON Forms (front matter)
summary: Example usage of JSON forms using front matter
draft: false
categories:
  - sample
tags:
  - sample

forms:
  main:
    target: dns-probes
    schema:
      {
        "type": "object",
        "title": "Variables",
        "required": ["DNS_TARGET"],
        "properties":
          {
            "DNS_SERVER":
              {
                "title": "DNS Server IP",
                "type": "string",
                "default": "8.8.8.8",
              },
            "DNS_TARGET": { "title": "Target Domain", "type": "string" },
            "DNS_TEST_LB":
              {
                "title": "Test Load Balancers",
                "type": "boolean",
                "default": false,
              },
            "WEB_URL": { "title": "Probe Web URL", "type": "string" },
            "LIMIT":
              { "title": "Probe Count", "type": "integer", "maximum": 50 },
          },
      }

    uischema:
      {
        "type": "VerticalLayout",
        "elements":
          [
            {
              "type": "Group",
              "elements":
                [
                  {
                    "type": "HorizontalLayout",
                    "elements":
                      [
                        {
                          "type": "Control",
                          "scope": "#/properties/DNS_TARGET",
                          "options": { "multi": true },
                        },
                        {
                          "type": "Control",
                          "scope": "#/properties/DNS_SERVER",
                        },
                      ],
                  },
                  {
                    "type": "Control",
                    "scope": "#/properties/DNS_TEST_LB",
                    "label": "Check Load Balancer Info",
                    "options": { "toggle": true },
                  },
                ],
              "label": "DNS Target Environment",
            },
            {
              "type": "Group",
              "elements":
                [
                  { "type": "Control", "scope": "#/properties/WEB_URL" },
                  { "type": "Control", "scope": "#/properties/LIMIT" },
                ],
              "label": "",
              "rule":
                {
                  "effect": "HIDE",
                  "condition":
                    {
                      "scope": "#/properties/DNS_TEST_LB",
                      "schema": { "const": false },
                    },
                },
            },
          ],
      }
---

{{< toc >}}

{{< workflow form="main" debug="true" />}}

{{< tabs >}}
{{< tab "Variables" >}}

<pre   
  class="tab-no-padding text-gray-500"
  x-data="{ data: null }"
  x-text="JSON.stringify(data, null, 2)"
  @form:init.window="data = $event.detail?.data"
  @form:data.window="data = $event.detail?.data"
></pre>

{{< /tab >}}
{{< tab "Data Schema" >}}

<pre   
  class="tab-no-padding text-gray-500"
  x-data="{ data: null }"
  x-text="JSON.stringify(data, null, 2)"
  @form:init.window="data = $event.detail?.schema"
></pre>

{{< /tab >}}
{{< tab "UI Schema" >}}

<pre   
  class="tab-no-padding text-gray-500"
  x-data="{ data: null }"
  x-text="JSON.stringify(data, null, 2)"
  @form:init.window="data = $event.detail?.uischema"
></pre>

{{< /tab >}}
{{< /tabs >}}

## About schema-driven forms

We can generate forms using [**JSON Forms**](https://jsonforms.io/) by passing either _front matter_ (below) or [**as data files**](../data-driven). User input is captured as **variables** for the payload.

```yaml
---
title: JSON Forms Example
forms:
  main:
    target: dns-probes
    schema: { ... }
    uischema: { ... }
    data: {} # <-- You can also optionally specify the initial values
---

{{< literal text=`{{< workflow form="main" />}}` />}}
```

This approach works well _as long as the schema files are not too large_. For more complex forms, we suggest moving them to the data path.
