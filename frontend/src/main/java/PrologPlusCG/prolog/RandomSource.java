package PrologPlusCG.prolog;

import java.util.Date;


public class RandomSource {
	private long curSeed;

	public RandomSource() {
		Date nowDate = new Date();
		curSeed = nowDate.getTime();
	}
	
	public void setSeed(long newSeed) {
		curSeed = newSeed;
	}
	
	public int next(int bits) {
		advance();
		return (int) (curSeed >>> (31-bits));
	}
	
	public long nextRnd() {
		advance();
		return curSeed;
	}
	
	public long nextLong() {
		return ((long) next(31));
	}
	
	public void advance() {
		curSeed = (curSeed * 0x5DEECDL + 0xB31L) & ((1L << 31) - 1);
	}
	
	public double nextDouble() {
		long nextVal = ((long)(next(15)) << 15) + next(15);
		if (nextVal < 0) {
			nextVal = -nextVal;
		}
		return ((double) nextVal) / (double) (1L << 30);
	}
}
