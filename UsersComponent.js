const fs = require("fs")

class UsersComponent {
  constructor(statePath) {
    this.users = {}
    this.statePath = statePath
    try {
      this.users = JSON.parse(fs.readFileSync(statePath, "utf-8"))
    } catch(err) {
      console.log(err.message)
      this.serialize()
    }
  }

  serialize() {
    fs.writeFileSync(this.statePath, JSON.stringify(this.users, null, 2))
  }

  read(){
    return fs.readFileSync(this.statePath)
  }

  create(data) {
    const email = data.email
    const password = data.password

    this.users[email] = {
      email: email,
      password: password
    }

    this.serialize()
  }

  login(email, password) {
    const user = this.users[email]
    
    if (user && user.password === password) {
      return true
    }

    return false
  }
}

module.exports = UsersComponent