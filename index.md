---
layout: page
title: Home / Schedule
nav_order: 1
description: A week-to-week description of the content covered in the course.
currWeekNumber: "15"
---

# {{site.title}}: {{site.description}}

{: .mb-2 }
UC Berkeley, {{site.course.semester}}
{: .mb-0 .fs-6 .text-grey-dk-000 }

[Ed]({{site.course.edstem}}){:target="\_blank" .btn .btn-ed .mr-1 }
[Datahub]({{site.course.datahub}}){:target="\_blank" .btn .btn-datahub .mr-1 }
[Lecture Recordings]({{site.course.videos}}){:target="\_blank" .btn .btn-bcourses .mr-1 }
[Gradescope]({{site.course.gradescope}}){:target="\_blank" .btn .btn-gradescope .mr-1 }
[Extenuating Circumstances]({{site.course.extenuating_circumstances}}){:target="\_blank" .btn .btn-blue .mr-1}
[Regrade requests]({{site.course.regrades}}){:target="\_blank" .btn .mr-1}

<div>
{% assign instructors = site.staffers | where: 'role', 'Instructor' %}
  <div class="role">
    {% for staffer in instructors %}
    {{ staffer }}
    {% endfor %}
  </div>
</div>

{% assign announcement = site.announcements | last %}
{% if announcement.week == page.currWeekNumber %}
  {{ announcement }}
{% endif %}


<a name="schedule"></a>

# Schedule

[Jump to current week](#week-{{page.currWeekNumber}}){: .btn }

{% for module in site.modules %}
{{ module }}
{% endfor %}
