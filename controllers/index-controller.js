const tmdb = require('themoviedb-api-client')('b011657c7c045755228ebfcd2cde1c92');


/**
 * 
 */
class IndexController {

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    index(req, res) {

        tmdb.miscUpcomingMovies().then((response) => {
            res.render('index', { data: response.body });
        })
            .catch(function (error) {
                console.log(error)
            });


    }

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    search(req, res) {

        var pageId = 1;

        var name = req.body.name;

        // var pageId = parseInt(req.params.id) + 1;

        tmdb.searchMovie({ query: name, page: pageId }).then((response) => {
            res.render('search', { data: response.body, name: name, page: pageId });
        })
            .catch(function (error) {
                console.log(error)
            });
    }

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    searchPage(req, res) {

        var name = req.params.name;
        var pageId = parseInt(req.params.page) + 1;

        // var pageId = parseInt(req.params.id) + 1;

        tmdb.searchMovie({ query: name, page: pageId }).then((response) => {
            res.render('search', { data: response.body, name: name, page: pageId });
        })
            .catch(function (error) {
                console.log(error)
            });
    }

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    nextPage(req, res) {

        var pageId = parseInt(req.params.id) + 1;

        tmdb.miscUpcomingMovies({ page: pageId }).then((response) => {
            res.render('index', { data: response.body });
        })
            .catch(function (error) {
                console.log(error)
            });
    }

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    moreInfo(req, res) {
        tmdb.movieInfo({ id: req.params.id }).then((response) => {

            var data = response.body;
            var genres = null;
            response.body.genres.forEach(element => {
                if (genres === null) {
                    genres = element.name;
                } else {
                    genres = genres + ', ' + element.name;
                }
            });
            data.genres = genres;

            var date = data.release_date.split("-");
            data.release_date = date[1] + '/' + date[2] + '/' + date[0];

            res.render('more-info', { data: data });
        })
            .catch(function (error) {
                console.log(error)
            });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    json(req, res) {

        // tmdb.searchMovie({ query: 'Alien' }).then((res) => {
        //     console.log(res.body);
        // })
        // .catch(function (error) {
        //     console.log(error)
        // });

        tmdb.miscUpcomingMovies().then((response) => {
            res.json(response.body.results);
        })
            .catch(function (error) {
                console.log(error)
            });


    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    jsonInfo(req, res) {

        tmdb.movieInfo({ id: req.params.id }).then((response) => {
            res.json(response.body);
        })
            .catch(function (error) {
                console.log(error)
            });


    }

}


module.exports = new IndexController();