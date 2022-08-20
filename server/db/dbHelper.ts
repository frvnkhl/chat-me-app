const sqlDataConfig = (sqlString: string) => {
  return JSON.stringify({
    operation: "sql",
    sql: sqlString,
  });
};

const postMethodConfig = (dbUrl: string, dbAPI: string, data: string) => {
  return {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbAPI}`,
    },
    data: data,
  };
};

const insertDataConfig = (records: any, table: string) => {
    return JSON.stringify({
      operation: "insert",
      schema: "realtime_chat_app",
      table: table,
      records: [records],
    });
}

export { sqlDataConfig, postMethodConfig, insertDataConfig };