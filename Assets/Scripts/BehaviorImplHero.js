#pragma strict

// Hero's implementation of behavior
class HeroBehavior extends NPCBehavior {
	// A hit list to remember who to attack next
	private var hitList : HitList;
	
	function HeroBehavior(go : GameObject) {
		super(go);
		hitList = new HitList();
	}
	
	function GotHit(attacker : GameObject) {
		super.GotHit(attacker);
		FoundNewTarget(attacker, 2);
	}
	
	function TargetDead() {
		super.TargetDead();
		// Get the next target from the hit list
		if (hitList.size() > 0) {
			var pt : PriorityTarget = hitList.PopTarget();
			super.setTarget(pt.target, pt.priority);
		}
	}
	
	function FoundNewTarget(newTarget : GameObject, priority : int) {
		if (super.currentTarget == null) {
			// If I'm not chasing anyone, chase this guy
			super.setTarget(newTarget, priority);
		} else if(super.currentTarget == newTarget) {
			// I've already got this guy targeted!
			return;
		} else {
			// I'm busy now, add him to my hit list
			hitList.AddNewTarget(newTarget, priority);
		}
	}
	
	function Update() {
		super.Update();
	}
}