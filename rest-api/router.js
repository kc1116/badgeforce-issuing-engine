const badgeEngine = require('../badge/badge-engine')
let router = require('express').Router()

router.post('/badge-class', function (req, res) {
  badgeEngine.createNewBadgeClass(req.body, (err, results) => {
    if (err) {
      res.json({error: err})
    } else {
      res.json({ bagdge_class_created: results })
    }
  })
})

router.post('/assertion', function (req, res) {
  badgeEngine.issueNewBadge(req.body, (err, results) => {
    if (err) {
      res.json({error: err})
    } else {
      res.json({ assertion_created: results })
    }
  })
})

router.post('/issuer', function (req, res) {
  badgeEngine.createNewIssuer(req.body, (err, results) => {
    if (err) {
      res.json({error: err})
    } else {
      res.json({ issuer_created: results })
    }
  })
})

module.exports = router
