<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ page.title }}</title>
    <link rel="stylesheet" href="{{ common.cdn }}/{{ common.styles }}">
    {% if pageStyles %}
        <link rel="stylesheet" href="{{ common.cdn }}/{{ pageStyles }}">
    {% endif %}

    <link rel="shortcut icon" href="">
</head>

<body>
    <header class="header">
        {% block title %}
            <h4>{{ page.title }}</h4>
        {% endblock %}
    </header>

    {% block content %}{% endblock %}

    {% block footer %}
        <footer>
            <div class="footer" >
                I'm a footer
            </div>
        </footer>
    {% endblock %}

    <script src="{{ common.cdn }}/{{ common.scripts }}"></script>
    {% if pageScripts %}
        <script src="{{ common.cdn }}/{{ pageScripts }}"></script>
    {% endif %}
</body>
</html>