module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('videos', [{
      userId: 1,
      filename: 'video.mp4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('videos', null, {});
  },
};
