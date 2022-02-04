module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        display_name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        // password: '$argon2id$v=19$m=4096,t=3,p=1$LIM370Ee/r4EzpUQfAN5GA$90/J5chFWiwee3jstGksqdtMp3VN7Z93yEM8CNC2Uk8',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        display_name: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        //password: '$argon2id$v=19$m=4096,t=3,p=1$Q6AQr5a4VHVWvW7tD9y1Xw$uTpiGzcIxSPxTpffOssIZL8rtCdct1Alc/aoaXpJbQ0',
        password: '123456',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
