import Ember from 'ember';
import _ from 'lodash';

export default Ember.Controller.extend({


  userSkillIds: Ember.computed('user.skills.[]', function() {
    return this.get('user.skills').map((id) => id.toString());
  }),

  // Just returns the skills
  selectedSkills: Ember.computed('userSkillIds.[]','skills.[]', function() {
    let userSkills  = this.get('userSkillIds');
    return this.get('skills').filter((skill) => {
      return userSkills.indexOf(skill.get('id')) > -1;
    });
  }),

  groupedSkills: Ember.computed('skills.[]', 'userSkillIds.[]', function() {
    let skills      = this.get('skills').toArray();

    // if your DB is storing the ids as integers in the user.skills array,
    // then convert them to a string here as ember ids are strings
    let userSkills  = this.get('userSkillIds');
    let lookup = {};

    // Group each skill by the category
    skills.forEach((skill) => {
      lookup[skill.get('category')] = lookup[skill.get('category')] || {
        category: skill.get('category'),
        skills:   Ember.A([])
      };

      lookup[skill.get('category')].skills.pushObject(
        // ObjectProxy allows you to 'wrap' an object.
        // where your main object is set as content and then any
        // other properties you want to add (selected) are siblings.
        // When getting a property from an ObjectProxy, it will first
        // try to find the property at the top level of the object and then
        // if not found, will "proxy" the property through to the content property
        Ember.ObjectProxy.create({
          selected: userSkills.indexOf(skill.get('id')) > -1,
          content: skill
        })
      );
    });

    return _.values(lookup);
  }),

  actions: {
    toggleSkill(skill, selected) {
      // pushObject / removeOject doesn't require you to actually supply
      // a POJO.
      if (selected) {
        this.get('user.skills').pushObject(parseInt(skill.get('id')));
      } else {
        this.get('user.skills').removeObject(parseInt(skill.get('id')));
      }
    }
  }

});
