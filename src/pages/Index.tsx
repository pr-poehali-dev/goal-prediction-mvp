import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const mockMatches = [
  {
    id: 1,
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    time: '15:00',
    probability: 78,
    oddsBookmaker: 1.65,
    oddsModel: 1.28,
    valueBet: true,
    status: 'live',
    minute: 23,
    homeForm: [1, 1, 0, 1, 1],
    awayForm: [1, 1, 1, 0, 1],
  },
  {
    id: 2,
    league: 'La Liga',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    time: '17:30',
    probability: 82,
    oddsBookmaker: 1.55,
    oddsModel: 1.22,
    valueBet: true,
    status: 'upcoming',
    minute: 0,
    homeForm: [1, 1, 1, 1, 0],
    awayForm: [1, 0, 1, 1, 1],
  },
  {
    id: 3,
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    time: '18:00',
    probability: 65,
    oddsBookmaker: 1.85,
    oddsModel: 1.54,
    valueBet: false,
    status: 'upcoming',
    minute: 0,
    homeForm: [1, 0, 1, 1, 1],
    awayForm: [0, 1, 1, 0, 1],
  },
  {
    id: 4,
    league: 'Serie A',
    homeTeam: 'Inter Milan',
    awayTeam: 'Juventus',
    time: '19:45',
    probability: 71,
    oddsBookmaker: 1.72,
    oddsModel: 1.41,
    valueBet: true,
    status: 'upcoming',
    minute: 0,
    homeForm: [1, 1, 0, 1, 1],
    awayForm: [1, 1, 1, 1, 0],
  },
];

const probabilityData = [
  { minute: 0, probability: 15 },
  { minute: 5, probability: 28 },
  { minute: 10, probability: 42 },
  { minute: 15, probability: 55 },
  { minute: 20, probability: 64 },
  { minute: 25, probability: 71 },
  { minute: 30, probability: 75 },
  { minute: 35, probability: 77 },
  { minute: 40, probability: 78 },
  { minute: 45, probability: 78 },
];

const teamStatsData = [
  { stat: 'Shots', home: 8, away: 5 },
  { stat: 'On Target', home: 4, away: 2 },
  { stat: 'Possession', home: 58, away: 42 },
  { stat: 'Passes', home: 342, away: 267 },
  { stat: 'Attacks', home: 47, away: 32 },
];

const leaderboardData = [
  { rank: 1, name: 'AlexPredictor', points: 2847, streak: 12, accuracy: 76, badge: 'diamond' },
  { rank: 2, name: 'GoalHunter23', points: 2654, streak: 8, accuracy: 74, badge: 'platinum' },
  { rank: 3, name: 'StatsMaster', points: 2512, streak: 5, accuracy: 72, badge: 'gold' },
  { rank: 4, name: 'BetWizard', points: 2389, streak: 3, accuracy: 71, badge: 'gold' },
  { rank: 5, name: 'FootballAI', points: 2201, streak: 15, accuracy: 69, badge: 'silver' },
];

const historicalData = [
  { league: 'Premier League', avgGoal1H: 1.42, pct: 68 },
  { league: 'La Liga', avgGoal1H: 1.38, pct: 65 },
  { league: 'Bundesliga', avgGoal1H: 1.55, pct: 72 },
  { league: 'Serie A', avgGoal1H: 1.28, pct: 61 },
  { league: 'Ligue 1', avgGoal1H: 1.31, pct: 63 },
];

export default function Index() {
  const [selectedMatch, setSelectedMatch] = useState(mockMatches[0]);

  const getValueBetDiff = (bookmaker: number, model: number) => {
    const impliedProb = 1 / bookmaker;
    const modelProb = 1 / model;
    return ((modelProb - impliedProb) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Activity" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">First Half Goal Predictor</h1>
                <p className="text-xs text-muted-foreground">Real-time ML Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-muted-foreground">Live</span>
              </div>
              <Badge variant="outline" className="gap-1">
                <Icon name="Trophy" size={14} />
                Rank #12
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="matches" className="gap-2">
              <Icon name="Target" size={16} />
              Live Matches
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Icon name="Trophy" size={16} />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="Database" size={16} />
              Historical
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                {mockMatches.map((match) => (
                  <Card
                    key={match.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedMatch.id === match.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {match.league}
                          </Badge>
                          {match.status === 'live' && (
                            <Badge className="bg-destructive gap-1 animate-pulse">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              LIVE {match.minute}'
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">{match.time}</span>
                      </div>

                      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-3">
                        <div>
                          <p className="font-semibold">{match.homeTeam}</p>
                          <div className="flex gap-1 mt-1">
                            {match.homeForm.map((result, i) => (
                              <div
                                key={i}
                                className={`w-5 h-5 rounded-sm flex items-center justify-center text-xs ${
                                  result ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                                }`}
                              >
                                {result ? 'W' : 'L'}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-bold font-mono text-primary">{match.probability}%</div>
                          <p className="text-xs text-muted-foreground">Goal Probability</p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">{match.awayTeam}</p>
                          <div className="flex gap-1 mt-1 justify-end">
                            {match.awayForm.map((result, i) => (
                              <div
                                key={i}
                                className={`w-5 h-5 rounded-sm flex items-center justify-center text-xs ${
                                  result ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                                }`}
                              >
                                {result ? 'W' : 'L'}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Bookmaker:</span>
                            <span className="ml-1 font-mono font-semibold">{match.oddsBookmaker.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Model:</span>
                            <span className="ml-1 font-mono font-semibold text-primary">{match.oddsModel.toFixed(2)}</span>
                          </div>
                        </div>
                        {match.valueBet && (
                          <Badge className="bg-secondary gap-1">
                            <Icon name="TrendingUp" size={14} />
                            +{getValueBetDiff(match.oddsBookmaker, match.oddsModel)}% Value
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Icon name="Activity" size={18} />
                      Probability Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={probabilityData}>
                        <defs>
                          <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="minute"
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '11px' }}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="probability"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorProb)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Icon name="Flame" size={18} className="text-destructive" />
                      Hot Matches
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockMatches
                      .filter((m) => m.valueBet)
                      .slice(0, 3)
                      .map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div>
                            <p className="text-sm font-semibold">{match.homeTeam.split(' ').pop()}</p>
                            <p className="text-xs text-muted-foreground">{match.league}</p>
                          </div>
                          <Badge className="bg-secondary text-xs">
                            {match.probability}%
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Team Statistics Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamStatsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="home" fill="hsl(var(--primary))" name="Home Team" />
                      <Bar dataKey="away" fill="hsl(var(--secondary))" name="Away Team" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Model Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="text-sm font-mono font-semibold">76.4%</span>
                    </div>
                    <Progress value={76.4} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Precision</span>
                      <span className="text-sm font-mono font-semibold">73.8%</span>
                    </div>
                    <Progress value={73.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Recall</span>
                      <span className="text-sm font-mono font-semibold">79.2%</span>
                    </div>
                    <Progress value={79.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">F1 Score</span>
                      <span className="text-sm font-mono font-semibold">76.4%</span>
                    </div>
                    <Progress value={76.4} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Predictions Today</span>
                      <span className="font-mono font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Value Bets Found</span>
                      <span className="font-mono font-semibold text-success">38</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Response Time</span>
                      <span className="font-mono font-semibold">1.2s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={20} className="text-warning" />
                  Top Predictors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? 'bg-warning/20 text-warning'
                              : user.rank === 2
                              ? 'bg-muted-foreground/20 text-muted-foreground'
                              : user.rank === 3
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Target" size={12} className="mr-1" />
                              {user.accuracy}%
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Zap" size={12} className="mr-1" />
                              {user.streak} streak
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold font-mono text-primary">{user.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Today's Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <p className="text-sm">Predict 5 matches correctly</p>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">3/5 completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Your Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-mono font-semibold">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Streak</span>
                      <span className="font-mono font-semibold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Points</span>
                      <span className="font-mono font-semibold">1,854</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                      <Icon name="Award" size={20} className="text-warning" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Star" size={20} className="text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <Icon name="Zap" size={20} className="text-success" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon name="Lock" size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>League Statistics - First Half Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="league" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Bar dataKey="pct" fill="hsl(var(--primary))" name="Goal %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Average Goals by Time Slot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { slot: '0-15 min', goals: 0.42, pct: 28 },
                      { slot: '15-30 min', goals: 0.58, pct: 39 },
                      { slot: '30-45 min', goals: 0.48, pct: 32 },
                    ].map((slot) => (
                      <div key={slot.slot}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{slot.slot}</span>
                          <span className="text-sm font-mono">{slot.goals} goals</span>
                        </div>
                        <Progress value={slot.pct} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon name="TrendingUp" size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Bundesliga leads in 1H goals</p>
                      <p className="text-xs text-muted-foreground">72% matches have first half goal</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <Icon name="Clock" size={20} className="text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Peak time: 15-30 minutes</p>
                      <p className="text-xs text-muted-foreground">39% of all first half goals</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <Icon name="Target" size={20} className="text-success flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Model confidence high</p>
                      <p className="text-xs text-muted-foreground">76.4% accuracy on predictions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
