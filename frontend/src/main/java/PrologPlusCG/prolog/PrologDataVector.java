package PrologPlusCG.prolog;

import java.util.Vector;

public class PrologDataVector {
	private Vector<PrologData> vec = null;
	public PrologDataVector() {
		vec = new Vector<PrologData>();
	}
	
	public PrologDataVector(int a, int b) {
		vec = new Vector<PrologData>(a, b);
	}
	
	public PrologData get(int index) {
		return vec.get(index);
	}
	
	public void clear() {
		vec.clear();
	}
	
	public PrologData elementAt(int index) {
		return get(index);
	}
	
	public PrologData lastElement() {
		int mySize = size();
		if (mySize == 0) {
			throw new java.util.NoSuchElementException();
		} else {
			return get(mySize-1);
		}
	}
	
	public void set(int index, PrologData pd) {
		vec.set(index,  pd);
	}
	
	public boolean isEmpty() {
		return vec.size() == 0;
	}
	
    public synchronized int size() {
    		return vec.size();
    }
	
    public void addElement(PrologData pd) {
    		vec.add(pd);
    }

    public void add(PrologData pd) {
		vec.add(pd);
    }	
    
    
    public void shuffle() {
    		RandomSource rnd = new RandomSource();
    		shuffle(rnd);
    }
    
    public void shuffle(RandomSource rnd) {
    		int mySize = this.size();
    		for (int i = mySize; i > 0; i--) {
    			swap(i-1, (int) (rnd.nextRnd() % mySize));
    		}
    }
    
    public void swap(int i1, int i2) {
    		PrologData tmp = get(i1);
    		set(i1, get(i2));
    		set(i2, tmp);
    }
    
    public void trimToSize() {
    		// Nothing to do for this JavaScript transpilation.
    }
}
