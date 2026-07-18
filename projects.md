---
layout: page
title: Projects
---

{% assign projects_by_category = site.data.projects | group_by: "category" %}
{% assign category_order = "Technical,Design,Personal" | split: "," %}

{% for cat_name in category_order %}
  {% assign category = projects_by_category | where: "name", cat_name | first %}
  {% if category %}
  <h3>{{ category.name }}</h3>
  <ul>
    {% for project in category.items %}
      <li>
        {% if project.link_text and project.link and project.link != "" %}
          {{ project.title }}: <a href="{{ project.link }}" target="_blank" rel="noopener noreferrer">{{ project.link_text }}</a>
        {% elsif project.link and project.link != "" %}
          <a href="{{ project.link }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a>
        {% else %}
          <strong>{{ project.title }}</strong>
        {% endif %}
        {% if project.summary and project.summary != "" %}
        <p style="margin-top: 0.5em; margin-bottom: 1em;">{{ project.summary }}</p>
        {% endif %}
        {% if project.skills and project.skills.size > 0 %}
          <p style="margin-top: 0.5em; margin-bottom: 1em;"><strong>Skills:</strong> {{ project.skills | join: ", " }}</p>
        {% endif %}
        {% if project.additional_links %}
          <ul style="margin-top: 0.5em; margin-bottom: 1em;">
            {% for link in project.additional_links %}
              <li><a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.title }}</a></li>
            {% endfor %}
          </ul>
        {% endif %}
        {% if project.projects %}
          <ul style="margin-top: 0.5em; margin-bottom: 1em;">
            {% for subproject in project.projects %}
              <li>
                {% if subproject.link and subproject.link != "" %}
                  <a href="{{ subproject.link }}" target="_blank" rel="noopener noreferrer">{{ subproject.title }}</a>
                {% else %}
                  {{ subproject.title }}
                {% endif %}
              </li>
            {% endfor %}
          </ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
