const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

const staff = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Doe', position: 'Developer' },
    { id: 3, name: 'Mike Doe', position: 'Designer' },
    { id: 4, name: 'Emma Doe', position: 'Tester' },
]

// define the home page route
router.get('/', (req, res) => {
  res.send('Staff home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About Staff')
})

//read the staff

router.get('/staff', (req, res) => {
  res.json(staff)
})

// create a new staff member

router.post('/staff', (req, res) => {
  const newStaffMember = {
    id: staff.length + 1,
    name: req.body.name,
    position: req.body.position,
  }
  staff.push(newStaffMember)
  res.json(newStaffMember)
})

// update a staff member

router.put('/staff/:id', (req, res) => {
  const staffMember = staff.find((s) => s.id === parseInt(req.params.id))
  if (!staffMember) return res.status(404).send('The staff member with the given ID was not found.')

  staffMember.name = req.body.name
  staffMember.position = req.body.position

  res.json(staffMember)
})

// delete a staff member

router.delete('/staff/:id', (req, res) => {
  const index = staff.findIndex((s) => s.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('The staff member with the given ID was not found.')

  staff.splice(index, 1)
  res.send(`Staff member with ID: ${req.params.id} has been deleted.`)
})


module.exports = router