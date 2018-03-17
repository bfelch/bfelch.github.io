---
layout: wrapper
---

<style>
.blockquote {
	color: white;
	text-align: justify;
}

.blockquote-footer {
	color: lightgrey;
}

.category-thumb {
	max-width: 300px;
	max-height: 200px;
	overflow: hidden;
}

.category-title {
	font-size: 1.5em;
}

.about-text {
	max-width: 60%;
	padding-top: 3em;
	padding-bottom: 3em;
	text-align: justify;
}
</style>

<div class='banner banner-main'>
	<div class='banner-overlay'></div>
	<div class='center'>
		<blockquote class='blockquote'>
			<p class='mb-0'>{{ site.quote }}</p>
			<footer class='blockquote-footer'>{{ site.quote_author }}</footer>
		</blockquote>
	</div>
</div>

{% include navbar.html %}

<div class='container about-text'>
	<div class='row'>
		<div class='col'>
			Hello there!  I'm Brandon, and welcome to my little corner of the internet.  I live by a philosophy of 'Never stop learning, and have fun doing it'.  I love trying new things and intend to keep trying new things until I am physically unable to do so.
		</div>
	</div>
	<br/>
	<div class='row'>
		<div class='col'>
				Below, you can find some of the things I've created.  So far, those things are pretty limited to games, but I'm currently learning the crafts of jewelry metalsmithing and home repair, so come back often to keep an eye on my progress.
		</div>
	</div>
	<br/>
	<div class='row'>
		<div class='col'>
			<!--Head on over to my Youtube channel to check out what I've done already, or-->At this point, I haven't posted any videos to Youtube, but you can hit me up on Twitter if you have an idea on what I should try next.
		</div>
	</div>
</div>

<div class='banner banner-projects'>
	<div class='banner-overlay'></div>
	<div class='banner-title center'>PROJECTS</div>
</div>

<div class='container'>
	<div class='row'>
		{% for collection in site.collections %}
			{% if collection.label != 'posts' %}
				<a class='col-lg container category-thumb'
					href='/projects/{{ collection.label }}'>
					<div class='banner banner-{{collection.label | downcase}}'>
					</div>
					<p class='banner-title category-title center'>
						{{ collection.label | upcase }}</p>
				</a>
			{% endif %}
		{% endfor %}
	</div>
</div>