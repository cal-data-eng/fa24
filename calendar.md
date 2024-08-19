---
layout: page
title: Calendar
description: Listing of course modules and topics.
nav_order: 1
---

# Calendar

{% assign mods = site.modules %}
{% assign active-mods = '' | split: '' %}

{% for mod in mods %}
  {% if mod.status == 'Active' %}
    {% assign active-mods = active-mods | push: mod %}
  {% endif %}
{% endfor %}

{% for module in active-mods %}
  {{ module }}
{% endfor %}
