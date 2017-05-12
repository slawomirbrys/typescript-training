type Subscriptions = Function[];
type SubscriptionsMap = {
  [type: string]: Subscriptions;
};

class EventEmitter {
  private subscribers: SubscriptionsMap;

  constructor(){
    this.subscribers = {}; // string to subcribers map
  }

  trigger(type: string, $event: any): void {
    if (this.subscribers[type]){
      this.subscribers[type].forEach(function(subFn){
        subFn($event);
      });
    }
  }

  on(type: string, subFn: Function): void {
    if (!this.subscribers[type]){
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(subFn);
  }

  off(type: string, subFn: Function): void {
    if (this.subscribers[type]){
      let index = this.subscribers[type].indexOf(subFn);
      if (index >= 0) {
        this.subscribers[type].splice(index, 1);
      }
    }
  }
}

describe('Event Emitter', function(){

	// for each test, there's a new EventEmitter instance created separately

	var ee, consumerA, consumerB, consumerC;
	beforeEach(function(){
		ee = new EventEmitter();
		consumerA = jasmine.createSpy('consumerA');
		consumerB = jasmine.createSpy('consumerB');
		consumerC = jasmine.createSpy('consumerC');
	});

	it("doesn't emit any message if there's no listener", function(){
		var message = { operation: "PROCESS"};
		ee.trigger('operations', message);

		expect(consumerA).not.toHaveBeenCalled();
		expect(consumerB).not.toHaveBeenCalled();
		expect(consumerC).not.toHaveBeenCalled();
	});

	it('emits a message to a single listener', function(){
		ee.on('operations', consumerA);

		var message = { operation: "PROCESS"};
		ee.trigger('operations', message);

		expect(consumerA).toHaveBeenCalledWith(message);
		expect(consumerB).not.toHaveBeenCalled();
		expect(consumerC).not.toHaveBeenCalled();
	});

	it('emits a message to multiple listeners', function(){
		ee.on('operations', consumerA);
		ee.on('operations', consumerB);
		ee.on('operations', consumerC);

		var message = { operation: "PROCESS"};
		ee.trigger('operations', message);

		expect(consumerA).toHaveBeenCalledWith(message);
		expect(consumerB).toHaveBeenCalledWith(message);
		expect(consumerC).toHaveBeenCalledWith(message);
	});

	it('emits messages on a certain channel', function(){
		ee.on('operations', consumerA);

		var message1 = { operation: "PROCESS"};
		ee.trigger('operations', message1);

		var message2 = "No more cookies for you!";
		ee.trigger('alerts', message2);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).not.toHaveBeenCalled(); // at all
		expect(consumerC).not.toHaveBeenCalled(); // at all
	});

	it('emits messages on multiple channels', function(){
		ee.on('operations', consumerA);
		ee.on('operations', consumerB);

		ee.on('alerts', consumerB);
		ee.on('alerts', consumerC);

		var message1 = { operation: "PROCESS"};
		ee.trigger('operations', message1);

		var message2 = "No more cookies for you!";
		ee.trigger('alerts', message2);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerB).toHaveBeenCalledWith(message1);
		expect(consumerC).not.toHaveBeenCalledWith(message1);
		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).toHaveBeenCalledWith(message2);
		expect(consumerC).toHaveBeenCalledWith(message2);
	});

	it('stops emitting messages to unsubscribed listeners', function(){
		ee.on('operations', consumerA);

		var message1 = { operation: "PROCESS-1"};
		ee.trigger('operations', message1);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerB).not.toHaveBeenCalledWith(message1);
		expect(consumerC).not.toHaveBeenCalledWith(message1);

		ee.off('operations', consumerA);
		ee.on('operations', consumerB);

		var message2 = { operation: "PROCESS-2"};
		ee.trigger('operations', message2);

		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).toHaveBeenCalledWith(message2);
		expect(consumerC).not.toHaveBeenCalledWith(message2);

		ee.off('operations', consumerB);
		ee.on('operations', consumerC);

		var message3 = { operation: "PROCESS-3"};
		ee.trigger('operations', message3);

		expect(consumerA).not.toHaveBeenCalledWith(message3);
		expect(consumerB).not.toHaveBeenCalledWith(message3);
		expect(consumerC).toHaveBeenCalledWith(message3);
	});
});
