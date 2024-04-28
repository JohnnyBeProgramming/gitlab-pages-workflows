---
title: JSON Forms (schema files)
summary: Example usage for the JSON form using data-driven schema files.
draft: false
categories:
  - sample
tags:
  - sample
---

{{< toc >}}

{{< workflow form="dns-probes" debug="true" />}}

## About data-driven JSON forms

This example is similar to the [JSON Forms with front matter](../json-forms) example, except that _we moved the JSON schema files_ into the `./data/forms/` path.

```yaml
---
title: Data-driven JSON Forms
# <-- No need to declare form here, it will look for schemas in `./data/forms/<form_id>/`
# <-- Target defaults to `form_id` if not explicitly set
---

{{< literal text=`{{< workflow form="dns-probes" />}}` />}}
```

{{< accordion "Show file locations" >}}

```text
data/
  forms/
    dns-probes/
      schema.json
      uischema.json
```

{{< /accordion >}}

If no target is set, form id is used. Some advantages of moving to _schema files_ includes _maintainability_, but also easier use with [online form builders](https://jsonforms-editor.netlify.app/).
