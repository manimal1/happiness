{% extends "layouts/master.tpl" %}

{% block title %}
    <h4>{{ page.title }}</h4>
{% endblock %}

{% block content %}
    <p>Occupation {{ page.occupation }}.</p>
    <div class="img-container">
        <img class="" src="{{ common.cdn }}/image.jpg" alt="image.jpg">
    </div>
{% endblock %}