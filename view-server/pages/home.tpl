{% extends "layouts/master.tpl" %}

{% block content %}
    <h4>Welcome To the {{ page.title }} </h4>
    <p>The value of your variable is {{ page.myVariable }}.</p>
{% endblock %}