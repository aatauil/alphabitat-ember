import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import EmberRouterScroll from 'ember-router-scroll';

export default class Router extends EmberRouterScroll {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('sitemap-txt', { path: 'sitemap.txt' }); // Required by ember-cli-prerender
  this.route('sitemap-xml', { path: 'sitemap.xml' }); // Optional
  this.route('home', {path: '/'})
  this.route('search', {path: '/searchpage'})
  this.route('estimation', {path: '/estimation'})
  this.route('contact', {path: '/contact'})
  this.route('favorites', {path: '/favorites'})
  this.route('property', {path: '/property'});
  this.route('not-found', {path: '/*path'});
});
