export default {
  secret: 'laa-lee-loo-lae-loe',
  dbConfig: {
    host: "localhost",
    username: "postgres",
    password: "root",
    port: 5432,
    database: "Test_Sql",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  
  // s3Bucket: {
  //   ACCESS_KEY_ID: 'something',
  //   SECRET_ACCESS_KEY: 'something',
  //   AWS_REGION: 'something',
  //   S3_BUCKET: 'something'
  // }
};
