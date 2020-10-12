export default {
  token: 'laa-lee-loo-lae-loe',
  // database: 'mongodb+srv://genxgroup:I32eg9x9Wf6XEuR4@api-onboarding.ribre.mongodb.net/api-onboarding?retryWrites=true&w=majority',
  // database: 'mongodb://localhost:27017/api-onboarding',
  dbConfig: {
    host: "localhost",
    username: "root",
    password: "root",
    port: 3306,
    database: "Test_Sql",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  // s3Bucket: {
  //   ACCESS_KEY_ID: 'AKIA3YQYPDC4PO7JH6A4',
  //   SECRET_ACCESS_KEY: '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',
  //   AWS_REGION: 'ap-southeast-1',
  //   S3_BUCKET: 'genx-bucket'
  // }
};
