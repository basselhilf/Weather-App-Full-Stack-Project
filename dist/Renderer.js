class Renderer {
  constructor() {}
  async renderData(allCityData) {
    const source = $('#template').html();
    const template = Handlebars.compile(source);
    let newHTML = template({ allCityData });
    await $('#list').empty().append(newHTML);
  }
}
