class Alignment {
  constructor(name, url, description) {
    this.name = name || null;
    this.url = url || null;

    if(description){this.description = description;}
  }
}