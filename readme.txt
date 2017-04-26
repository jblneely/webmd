1.  In controllers/symptoms.js
	added the route:

	router.get("/:id", function(req, res) {
    db.symptom.findOne({
        where: { id: req.params.id },
        include: [db.disease]
    }).then(function(disease) {
        res.render("symptoms/show", { symptom: symptom });
    });

2.  Created views/symptoms/show.ejs
	The symptoms are appear in the postico, but are not appearing on the show.ejs page.  I styled the show page modeling it on the diseases/show.ejs and my class notes (see attached file classNotes).

3.  I added two additional images on the diseases page.

4.  I added a bootstrap thumbnail and well (light grey box with rounded edges div) on the home.ejs page.

-- I was curious about bootstrap for backgound image, but didn't see it on the cheatsheet or on google search.


