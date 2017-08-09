<!DOCTYPE html>
<html lang="en" data-ng-app='GeoApp'>
<head>
    <meta charset="UTF-8">
    <title>Geoworld Testing</title>
    <link rel="stylesheet" href="resources/assets/css/app.css">
</head>
<body>
<nav id="geoworld-header">
    <div id="geoworld-header-left">
        <h1><span class="geoworld-highlight">Geo</span>World</h1>
    </div>
    <div id="geoworld-header-right">
        <a href="index.html"><h2>Home</h2></a>
        <a href="/cm0665-assignment/#/login"><h2>Login</h2></a>
        <a href="testing.php"><h2>Testing</h2></a>

    </div>
</nav>
<main>
    <section id="geoworld-banner">
        <div id="geoworld-banner-image">
            <h1>GeoWorld Testing Page</h1>
        </div>
    </section>
    <section id="geoworld-continents">
        <h1>Show Continents</h1>
        <a href="./server/index.php?action=list&subject=continents"><h3>cm0665-assignment/server/index.php?action=list&subject=continents</h3></a> <br/>
        <h1>Show Countries on a Continent and Country Information</h1>
        <a href="./server/index.php?action=list&subject=countries&id=EU"><h3>cm0665-assignment/server/index.php?action=list&subject=countries&id=EU</h3> </a><br/>

    </section>
</main>
<footer>

</footer>
<!-- load the basic angular libraries, though initially we'll only need the first two -->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.js"></script>

<!-- link to our application files -->
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/services.js"></script>

</body>
</html>
