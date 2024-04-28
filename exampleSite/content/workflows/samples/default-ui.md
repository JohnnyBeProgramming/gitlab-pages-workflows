---
title: JSON Forms (default UI)
summary: Example usage of JSON forms without having additional schema files.
draft: false
categories:
  - sample
tags:
  - sample
forms:
  only-data:
    data:
      {
        "DNS_SERVER": "8.8.8.8",
        "DNS_TARGET": "",
        "DNS_TEST_LB": false,
        "WEB_URL": "",
        "LIMIT": 50,
      }
  only-schema:
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
---

{{< toc >}}

{{< workflow form="only-schema" debug="true" />}}


## JSON Forms (default UI)

One great feature included in the [JSON Forms Generator](https://jsonforms.io/examples/gen-uischema) library, is the ability to auto generate a default UI layout if none is provided.

```text
# From front matter
forms:
  only-data:
    schema: { ... }

# From data files
data/
  forms/
    simple/
      schema.json   # <-- This is enough to generate a form UI
```

### With data only (no schemas provided)

This is even possible when only form `data` is provided (_eg: no `schema` or `uischema`_), but this is not reccommended.

{{< notice "info" >}}

Even if it's _technically feasable_, we don't advise generating forms without a `schema`, as they help you define constraints, validation and default values.

{{< /notice >}}

```text
# From front matter
forms:
  only-data:
    data: { ... }

# From data files
data/
  forms/
    simple/
      data.json   # <-- This is enough to generate a form UI
```

{{< workflow form="only-data" debug="true" />}}
