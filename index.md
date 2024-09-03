---
layout: page
title: Home
description: Listing of course modules and topics.
nav_order: 1
---

# Data 101: Data Engineering 💾

{: .mb-2 }

## UC Berkeley, Fall 2024
{: .mb-2 .fs-6 .text-grey-dk-000 }

[Ed]({{site.course.edstem}}){:target="\_blank" .btn .btn-ed .mr-1 }
[Lecture Recordings]({{site.course.videos}}){:target="\_blank" .btn .btn-bcourses .mr-1 }
[Gradescope]({{site.course.gradescope}}){:target="\_blank" .btn .btn-gradescope .mr-1 }
[Additional Extensions]({{site.course.additional_extensions}}){:target="\_blank" .btn .btn-datahub .mr-1 }
<!-- [Extenuating Circumstances]({{site.course.extenuating_circumstances}}){:target="\_blank" .btn .btn-blue .mr-1}
[Regrade requests]({{site.course.regrades}}){:target="\_blank" .btn .mr-1} -->

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
