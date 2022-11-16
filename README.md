# Employee Tracker

## Purpose 

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
<br>

## Table of Contents 

- [Purpose](#purpose)
- [Usage](#usage)
- [Built With](#built-with)
- [GitHub](#github-link)
- [Video](#video-link)

<br>

## Usage

Clone the repository to your local machine:

```
git clone git@github.com:aarce96/urban-doodle.git
```
<br>
Install all dependencies in package.json file with this command:

```
npm i
```
<br>
In the root terminal, run mysql

```
mysql -u root -p 
```
<br>
After running the command in previous step, a prompt to enter a password appears: 

```
enter your OWN password
``` 
<br>
Enter the following commands, one by one: 

```
source db/schema.sql;
source db/seeds.sql;
quit;

```
<br>
In the root terminal, enter the following command to run file:

```
node index
```

## Built With

* JavaScript
* Node
* Inquirer
* MySql
* console.table package

## GitHub link

https://github.com/aarce96/urban-doodle

## Video link
