import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', {path: '/'})
  this.route('search', {path: '/searchpage'})
  this.route('estimation', {path: '/estimation'})
  this.route('contact', {path: '/contact'})
  this.route('favorites', {path: '/favorites'})
});
