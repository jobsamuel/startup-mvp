# Startup Minimum Viable Product

Following the [Lean Startup] (http://theleanstartup.com/) philosophy, **Startup MVP** aims to validate a business idea in order to keep developing the right product. Offering a useful template to show your idea and collect data of possible customers, it might help you to answer a simple hypothesis: *Are people interested enough in my idea to keep developing it?*

# Getting Started

### Pre-requisites

Before deploy **startup-mvp** in Heroku or even execute it locally, you need to set up these services:

- [Firebase] (https://www.firebase.com/): it will be our database; the place where all the emails of posible customers will be stored. Just create a free account and *let's the hacking begin*.
- [Mandrill] (https://mandrillapp.com/): it will send a transational email to each person who liked your idea and signed up in your mvp. You could send 12000 emails per month with a free account! 
- [Keen IO] (https://keen.io/): it will be the tool to collect data of posible customers; signups, behavior, errors. With a free account you could collect 50000 events per month! That quantity is big enough for any small startup.  
- [Google Analytics] (http://www.google.com/analytics/) (optional): This doesn't need presentation, so if you want to collect a detailed data (country, ISP, returning visitors, bounce rate...) just track your new site using this too.  

Furthermore, you need to have installed [Node] (http://nodejs.org/) and [npm] (https://www.npmjs.org/) in your machine.

### Quick install

Open your console and type:

`$ git clone https://github.com/jobsamuel/startup-mvp.git`
`$ npm install`

### Configuration

- **Firebase** 
	- Go to *src/* and open *server.js*, then type your [Firebase URL] (https://www.firebase.com/docs/web/guide/understanding-data.html) here: 
	`var ref = new Firebase('<FIREBASE_URL>');`
	- Go to *src/* and open *server.js*, then paste your [Firebase Secret] (https://www.firebase.com/docs/web/guide/simple-login/custom.html) here: `ref.auth('<FIREBASE_SECRET>'`
- **Mandrill**
	- Go to *src/* and open *server.js*, then paste your [Mandrill API KEY] (http://help.mandrill.com/entries/21714881-How-do-I-access-Mandrill-for-sending-email-) here: 
	`var m = new mandrill.Mandrill('<MANDRILL_API_KEY>');` 
- **Keen IO**
	- Go to *src/* and open `index.hmtl`, then paste your [Keen IO Project ID and API KEY] (https://github.com/keenlabs/keen-js/wiki/Getting-Started) here: 
	`var client=new Keen({projectId:"<PROJECT_ID",writeKey:"WRITE_KEY"})`
- **Google Analytics**
	- Go to *src/* and open `index.hmtl`, then paste your [Google Analytics Tracking ID] (https://support.google.com/analytics/answer/1008080?hl=en) here: `ga('create', '<TRACKING_ID>', 'auto');`

### Usage

Assuming you followed all the previous steps and everything when great, open your console and type:

`$ npm start`

Then, open this url `http://127.0.0.1:8080/` in your browser. Now, you should see this:

![alt tag] (http://i.imgur.com/UVbo1Iq.png)

**Congratulations!**

### Build with Grunt

**Startup-mvp** uses [Grunt] (http://gruntjs.com/) to make everything easier. whether your app be ready to the world or you'd like to deploy it to heroku for testing purposes, build a new release just typing `$ grunt` in your console.  

# License

[MIT License] (http://opensource.org/licenses/MIT)