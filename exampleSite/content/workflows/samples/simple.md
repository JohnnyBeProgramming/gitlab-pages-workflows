---
title: A simple workflow example
summary: Oversimplified example using raw HTML as form controls
draft: false
categories:
  - sample
tags:
  - sample
---

{{< toc >}}

{{< workflow >}}

<div>  
  <input name="JOB_TO_RUN" value="dns-probes" type="hidden" >
  <label for="DNS_TARGET">Select Domain:</label>
  <select name="DNS_TARGET">
    <option>www.google.com</option>
    <option>maps.google.com</option>
    <option>mail.google.com</option>
    <option>reddit.com</option>
  </select>
  <button type="submit" class="border p-2">Run the Pipeline</button>
</div>

{{< /workflow >}}

## About this example 

This example demonstrates the simplest use case with raw HTML templates (eg: _form inputs and buttons_) to trigger a pipeline workflow.

{{< notice "info" >}}

It's generally **_not reccommended_** to use raw HTML templates, as we prefer to use managed [**JSON Forms**](../json-forms) schemas approach, but it's possible.

{{< /notice >}}

```html
{{< literal text=`{{< workflow >}}` />}}
<input name="JOB_TO_RUN" value="dns-probes" type="hidden" />
<label for="DNS_TARGET">Select Domain:</label>
<select name="DNS_TARGET">
  <option>www.google.com</option>
  <option>maps.google.com</option>
  <option>mail.google.com</option>
  <option>reddit.com</option>
</select>
<button type="submit" class="border p-2">Run the Pipeline</button>
{{< literal text=`{{< /workflow >}}` />}}
```
