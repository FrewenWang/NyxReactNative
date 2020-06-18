
package com.helloreactnative.packages;

import android.util.Log;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;


public final class DbThreadPool {
    private static final String TAG = DbThreadPool.class.getSimpleName();

    private static final int CPU_COUNT = Runtime.getRuntime().availableProcessors();
    private static final int CORE_POOL_SIZE = Math.max(2, Math.min(CPU_COUNT - 1, 4));
    private static final int MAXIMUM_POOL_SIZE = CPU_COUNT * 2 + 1;
    private static final int TIME_KEEP_ALIVE = 60;
    private static final int SIZE_PENDING_QUEUE = 10;
    private static final int PERIOD_SCHEDULE = 500;

    private final Queue<Runnable> mPendingQueue = new LinkedList<Runnable>();
    private final ScheduledExecutorService mScheduler = Executors.newScheduledThreadPool(1);
    private final RejectedExecutionHandler mRejectedExecutionHandler;
    private final ThreadPoolExecutor mThreadPool;

    public DbThreadPool(){

        mRejectedExecutionHandler = new RejectedExecutionHandler() {
            @Override
            public void rejectedExecution(Runnable task, ThreadPoolExecutor executor) {
                Log.d(TAG, "task queue offer rejected task");
                mPendingQueue.offer(task);
            }
        };

        mThreadPool = new ThreadPoolExecutor(
                CORE_POOL_SIZE,
                MAXIMUM_POOL_SIZE,
                TIME_KEEP_ALIVE,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<Runnable>(SIZE_PENDING_QUEUE),
                new MyThreadFactory(),
                mRejectedExecutionHandler);

        schedule();
    }

    public void execute(Runnable task) {
        if (task != null) {
            mThreadPool.execute(task);
        }
    }

    public boolean isTaskOver() {
        if (0 == mThreadPool.getActiveCount()) {
            return true;
        } else {
            return false;
        }
    }

    public void shutdown() {
        mPendingQueue.clear();
        mThreadPool.shutdown();
    }

    private boolean hasPendingTask() {
        return !mPendingQueue.isEmpty();
    }

    private void schedule() {
        mScheduler.scheduleAtFixedRate(
                new Runnable() {
                    @Override
                    public void run() {
                        if (hasPendingTask()) {
                            Log.d(TAG, "execute task from task queue");
                            mThreadPool.execute(mPendingQueue.poll());
                        }
                    }
                },
                0,
                PERIOD_SCHEDULE,
                TimeUnit.MILLISECONDS);
    }

    static class MyThreadFactory implements ThreadFactory {
        protected final AtomicInteger mCount = new AtomicInteger(1);
        protected String mThreadNamePrefix = "Db-work";
        @Override
        public Thread newThread(Runnable r) {
            return new Thread(r, mThreadNamePrefix + " #" + mCount.getAndIncrement());
        }
    }
}
