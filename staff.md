---
layout: page
title: Staff
description: A listing of all the course staff members.
nav_order: 4
---

# Staff

## Instructors

{% assign instructors = site.staffers | where: 'role', 'Instructor' %}

<div class="role flex">
{% for staffer in instructors %}
{{ staffer }}
{% endfor %}
</div>

{% assign head_teaching_assistants = site.staffers | where: 'role', 'Head Teaching Assistant' %}
{% assign num_head_teaching_assistants = head_teaching_assistants | size %}

{% if num_head_teaching_assistants != 0 %}

## Lead Teaching Assistants

<div class="role flex">
{% for staffer in head_teaching_assistants %}
{{ staffer }}
{% endfor %}
</div>

{% endif %}



{% assign teaching_assistants = site.staffers | where: 'role', 'Teaching Assistant' %}
{% assign num_teaching_assistants = teaching_assistants | size %}

{% if num_teaching_assistants != 0 %}

## Teaching Assistants

<div class="role flex">
{% for staffer in teaching_assistants %}
{{ staffer }}
{% endfor %}
</div>

{% endif %}

{% assign tutors = site.staffers | where: 'role', 'Tutor' %}
{% assign num_tutors = tutors | size %}

{% if num_tutors != 0 %}

## Tutors

<div class="role flex">
{% for staffer in tutors %}
{{ staffer }}
{% endfor %}
</div>

{% endif %}
