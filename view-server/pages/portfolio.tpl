{% extends "layouts/master.tpl" %}

{% block title %}
    <h4>{{ page.title }}</h4>
{% endblock %}

{% block content %}

    <p>Occupation {{ page.occupation }}.</p>

    <div class="clearfix">
        <div class="img-container float-left">
            <img class="" src="{{ common.cdn }}/image.jpg" alt="image.jpg">
        </div>

        <div class="contact float-left">
            <h4>Contact Widget</h4>
            {% for key, value in page.contact.address %}
                <div>
                    <span>{{ key | capitalize }} :</span>
                    <span>{{ value }}</span>
                </div>
            {% endfor %}
        </div>
    </div>
{% endblock %}