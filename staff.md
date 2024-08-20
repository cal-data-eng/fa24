---
layout: page
title: Staff
nav_order: 7
description: A listing of all the course staff members.
---

# Staff

<<<<<<< HEAD
Jump to: [Instructors](#inst), [Teaching Assistants](#tas), [Tutors/Readers](#tutors-readers).

**Note:** Consult the [calendar](/calendar) for the most up-to-date office hours for each course staff.

## Course Staff Email

Contact course staff via [Ed]({{ site.course.edstem }}) with any questions or concerns. For sensitive matters, the staff email address [data101@berkeley.edu](mailto:{{site.course.email}}) is monitored by the instructors and a few lead TAs.

<a name = 'inst'></a>

## Instructors

<div class="role">
  {% assign instructors = site.staffers | where: 'role', 'Instructor' %}
  {% for staffer in instructors %}
  {{ staffer }}
  {% endfor %}
</div>

<a name = 'tas'></a>

## Teaching Assistants

<div class="role">
  {% assign teaching_assistants = site.staffers | where: 'role', 'Teaching Assistant' %}
  {% for staffer in teaching_assistants %}
  {{ staffer }}
  {% endfor %}
</div>

<!---
<a name = 'tutors'></a>

## Tutors

<div class="role">
  {% assign readers = site.staffers | where: 'role', 'Tutor' %}
  {% for staffer in readers %}
  {{ staffer }}
  {% endfor %}
</div>

-->

<a name = 'readers'></a>

## Tutors / Readers

<div class="role">
  {% assign readers = site.staffers | where: 'role', 'Reader' %}
  {% for staffer in readers %}
  {{ staffer }}
  {% endfor %}
</div>
=======

## Instructors

<!-- {% assign instructors = site.staffers | where: 'role', 'Instructor' %}
{% for staffer in instructors %}
{{ staffer }}
{% endfor %}

{% assign head_teaching_assistants = site.staffers | where: 'role', 'Head Teaching Assistant' %}
{% assign num_head_teaching_assistants = head_teaching_assistants | size %}
{% if num_head_teaching_assistants != 0 %} -->

## Head Teaching Assistants

<!-- {% for staffer in head_teaching_assistants %}
{{ staffer }}
{% endfor %}
{% endif %}

{% assign teaching_assistants = site.staffers | where: 'role', 'Teaching Assistant' %}
{% assign num_teaching_assistants = teaching_assistants | size %}
{% if num_teaching_assistants != 0 %} -->

## Teaching Assistants

<!-- {% for staffer in teaching_assistants %}
{{ staffer }}
{% endfor %}
{% endif %}

{% assign tutors = site.staffers | where: 'role', 'Tutor' %}
{% assign num_tutors = tutors | size %}
{% if num_tutors != 0 %} -->

## Tutors

<!-- {% for staffer in tutors %}
{{ staffer }}
{% endfor %}
{% endif %}

{% assign academic_interns = site.staffers | where: 'role', 'Academic Intern' %}
{% assign num_academic_interns = academic_interns | size %}
{% if num_academic_interns != 0 %} -->

## Academic Interns

<!-- {% for staffer in academic_interns %}
{{ staffer }}
{% endfor %}
{% endif %} -->
>>>>>>> main
