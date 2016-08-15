import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return Ember.A(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});
