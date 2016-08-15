import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    Ember.run(this, function() {
      this.store.pushPayload('user', {
        user: {
          id:     1,
          name:   "Kyle Davis",
          skills: [2]
        }
      });

      this.store.pushPayload('skill', {
        skills: [
          { id: 1, name: "Skill 1", category: "First Category" },
          { id: 2, name: "Skill 2", category: "First Category" },
          { id: 3, name: "Skill 3", category: "First Category" },
          { id: 4, name: "Skill 4", category: "First Category" },
          { id: 5, name: "Skill 5", category: "Second Category" },
          { id: 6, name: "Skill 6", category: "Second Category" },
          { id: 7, name: "Skill 7", category: "Second Category" },
          { id: 8, name: "Skill 8", category: "Second Category" },
        ]
      });
    });
  },

  model() {
    return Ember.RSVP.hash({
      user: this.store.peekRecord('user', 1),
      skills: this.store.peekAll('skill')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  },

  actions: {
    save() {
      this.get('currentModel.user').save();
    }
  }

})
