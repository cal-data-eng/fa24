---
layout: page
title: Home
description: Listing of course modules and topics.
nav_order: 1
---

{% assign mods = site.modules %}

{% for mod in mods %}
  {% if mod.Status == 'Active' %}
    {{ mod }}
  {% endif %}
{% endfor %}
