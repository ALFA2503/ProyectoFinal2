class Users {
    constructor(name,email, password) {
      this._name = name
      this._email = email;
      this._password = password;
      this._ntfs = [];
      this._isActive = false;
    }
  
    get email() {
      return this._email;
    }
  
    set email(email) {
      this._email = email;
    }
  
    get password() {
      return this._password;
    }
  
    set password(password) {
      this._password = password;
    }
  
    get ntfs() {
      return this._ntfs;
    }
    set ntfs(ntf){
        this._ntfs.push(ntf);
    }
    agregarNtf(ntfss) {
      this._ntfs.push(ntfss);
    }
  
    eliminarNtf(ntf) {
      const index = this._ntfs.indexOf(ntf);
      if (index !== -1) {
        this._ntfs.splice(index, 1);
      }
    }
  
    obtenerNtfs() {
      return this._ntfs;
    }
  
    get isActive() {
      return this._isActive;
    }
  
    set isActive(isActive) {
      this._isActive = isActive;
    }


    get name() {
      return this._name;
    }
  
    set name(name) {
      this._name = name;
    }
  }
  