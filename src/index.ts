import chalk from "chalk";
import server from "./server";

const port = process.env.EXPRESS_PORT || 4000;

server.listen(port, () => {
  console.log(chalk.green(`Server listening on port ${port}`));
});
