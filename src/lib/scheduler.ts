/**
 * AutoInsight Scheduler
 * 
 * Provides scheduling for automatic weekly report generation.
 * In production, this would run via Vercel Cron or external scheduler.
 */

export interface ScheduleConfig {
  enabled: boolean;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  hour: number;
  minute: number;
  timezone: string;
}

export interface ScheduledTask {
  id: string;
  name: string;
  schedule: ScheduleConfig;
  lastRun: string | null;
  nextRun: string | null;
  status: 'active' | 'paused' | 'error';
}

const DEFAULT_SCHEDULE: ScheduleConfig = {
  enabled: true,
  dayOfWeek: 1, // Monday
  hour: 9,
  minute: 0,
  timezone: 'UTC',
};

export const SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: 'weekly-report',
    name: 'Generate Weekly Research Report',
    schedule: DEFAULT_SCHEDULE,
    lastRun: null,
    nextRun: null,
    status: 'active',
  },
];

export const calculateNextRun = (schedule: ScheduleConfig): Date => {
  const now = new Date();
  const next = new Date(now);
  
  next.setHours(schedule.hour, schedule.minute, 0, 0);
  
  const daysUntil = (schedule.dayOfWeek - now.getDay() + 7) % 7;
  if (daysUntil === 0 && next <= now) {
    next.setDate(next.getDate() + 7);
  } else {
    next.setDate(next.getDate() + daysUntil);
  }
  
  return next;
};

export const shouldRunTask = (task: ScheduledTask): boolean => {
  if (!task.schedule.enabled || task.status !== 'active') return false;
  
  const now = new Date();
  const nextRunTime = calculateNextRun(task.schedule);
  const windowStart = new Date(nextRunTime.getTime() - 60000);
  const windowEnd = new Date(nextRunTime.getTime() + 60000);
  
  return now >= windowStart && now <= windowEnd;
};

export const runScheduledReportGeneration = async (): Promise<{ success: boolean; message: string }> => {
  console.log('[Scheduler] Running scheduled report generation...');
  
  try {
    const { generateReport, selectApisToPurchase } = await import('@/lib/agent');
    
    const topic = ['DeFi', 'RWA', 'Stablecoins', 'AI x Crypto', 'Bitcoin Ecosystem'][Math.floor(Math.random() * 5)];
    const apis = selectApisToPurchase(topic, 5.0);
    
    console.log(`[Scheduler] Purchased ${apis.length} APIs for ${topic}`);
    console.log(`[Scheduler] Would run agent loop to generate report`);
    
    const report = await generateReport({ topic });
    
    console.log(`[Scheduler] Report generated: ${report.title}`);
    return { success: true, message: `Generated ${report.title}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Scheduler] Error:', message);
    return { success: false, message };
  }
};

export const startScheduler = (): (() => void) => {
  console.log('[Scheduler] Starting AutoInsight scheduler...');
  
  const interval = setInterval(() => {
    for (const task of SCHEDULED_TASKS) {
      if (shouldRunTask(task)) {
        console.log(`[Scheduler] Running task: ${task.name}`);
        runScheduledReportGeneration();
      }
    }
  }, 60000);
  
  return () => {
    console.log('[Scheduler] Stopping scheduler...');
    clearInterval(interval);
  };
};