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
	The symptoms are appear in the postico, but are not appearing on the show.ejs page.  I styled the show page modeling it on the diseases/show.ejs.

3.  I added two additional images on 	the diseases page.

4.  I added a bootstrap thumbnail and 		well on the home.ejs page.


