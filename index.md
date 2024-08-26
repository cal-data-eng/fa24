---
layout: page
title: Home
description: Listing of course modules and topics.
nav_order: 1
---

# Data 101: Data Engineering 💾

{: .mb-2 }
UC Berkeley, Fall 2024
{: .mb-2 .fs-6 .text-grey-dk-000 }

<!-- Insert Buttons here Later -->

<div class="role flex">
  {% assign instructors = site.staffers | where: 'role', 'InstructorHome' %}
  {% for staffer in instructors %}
    {{ staffer }}
  {% endfor %}
</div>

## Announcements

{% include announcements-navigation.html %}

## Schedule

{% assign mods = site.modules %}
{% for mod in mods %}
  {% if mod.Status == 'Active' %}
    {{ mod }}
  {% endif %}
{% endfor %}

<script src="{{ '/assets/scripts/announcement-navigation.js' | relative_url }}"></script>
