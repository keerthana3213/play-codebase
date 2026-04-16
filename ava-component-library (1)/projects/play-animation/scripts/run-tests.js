#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Comprehensive test runner for the component library
 */
class TestRunner {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.coverageDir = path.join(this.projectRoot, 'coverage');
    this.results = {
      unit: { passed: 0, failed: 0, total: 0 },
      integration: { passed: 0, failed: 0, total: 0 },
      accessibility: { passed: 0, failed: 0, total: 0 },
      performance: { passed: 0, failed: 0, total: 0 },
      coverage: { percentage: 0, threshold: 80 }
    };
  }

  /**
   * Run a specific test command
   */
  runTestCommand(command, testType) {
    console.log(`\n🚀 Running ${testType} tests...`);
    console.log(`Command: ${command}\n`);

    try {
      const output = execSync(command, { 
        cwd: this.projectRoot, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log(`✅ ${testType} tests passed!`);
      this.parseTestResults(output, testType);
      return true;
    } catch (error) {
      console.error(`❌ ${testType} tests failed!`);
      console.error(error.stdout || error.message);
      this.parseTestResults(error.stdout || '', testType);
      return false;
    }
  }

  /**
   * Parse test results from output
   */
  parseTestResults(output, testType) {
    // Basic parsing - in a real scenario, you'd use a proper test result parser
    const lines = output.split('\n');
    let passed = 0;
    let failed = 0;
    let total = 0;

    lines.forEach(line => {
      if (line.includes('SUCCESS')) {
        passed++;
        total++;
      } else if (line.includes('FAILED')) {
        failed++;
        total++;
      }
    });

    this.results[testType] = { passed, failed, total };
  }

  /**
   * Run unit tests
   */
  runUnitTests() {
    return this.runTestCommand(
      'ng test play-core --code-coverage --watch=false --include=**/*.spec.ts',
      'unit'
    );
  }

  /**
   * Run integration tests
   */
  runIntegrationTests() {
    return this.runTestCommand(
      'ng test play-core --code-coverage --watch=false --include=**/*.integration.spec.ts',
      'integration'
    );
  }

  /**
   * Run accessibility tests
   */
  runAccessibilityTests() {
    return this.runTestCommand(
      'ng test play-core --code-coverage --watch=false --include=**/*.a11y.spec.ts',
      'accessibility'
    );
  }

  /**
   * Run performance tests
   */
  runPerformanceTests() {
    return this.runTestCommand(
      'ng test play-core --code-coverage --watch=false --include=**/*.perf.spec.ts',
      'performance'
    );
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('🧪 Starting comprehensive test suite...\n');

    const results = {
      unit: this.runUnitTests(),
      integration: this.runIntegrationTests(),
      accessibility: this.runAccessibilityTests(),
      performance: this.runPerformanceTests()
    };

    this.generateReport(results);
    return results;
  }

  /**
   * Generate test coverage report
   */
  generateCoverageReport() {
    console.log('\n📊 Generating coverage report...');
    
    try {
      const coverageCommand = 'ng test play-core --code-coverage --watch=false --browsers=ChromeHeadless';
      execSync(coverageCommand, { cwd: this.projectRoot, stdio: 'pipe' });
      
      // Parse coverage data
      const coverageFile = path.join(this.coverageDir, 'play-core', 'coverage-summary.json');
      if (fs.existsSync(coverageFile)) {
        const coverageData = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
        this.results.coverage.percentage = coverageData.total.statements.pct;
      }
      
      console.log(`✅ Coverage report generated: ${this.coverageDir}/play-core/index.html`);
      return true;
    } catch (error) {
      console.error('❌ Failed to generate coverage report:', error.message);
      return false;
    }
  }

  /**
   * Generate comprehensive test report
   */
  generateReport(results) {
    console.log('\n📋 Test Results Summary');
    console.log('='.repeat(50));

    Object.entries(this.results).forEach(([testType, data]) => {
      if (testType === 'coverage') {
        console.log(`\n📊 Coverage: ${data.percentage}% (threshold: ${data.threshold}%)`);
        if (data.percentage >= data.threshold) {
          console.log('✅ Coverage threshold met!');
        } else {
          console.log('❌ Coverage threshold not met!');
        }
      } else {
        const { passed, failed, total } = data;
        const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
        
        console.log(`\n🧪 ${testType.charAt(0).toUpperCase() + testType.slice(1)} Tests:`);
        console.log(`   Total: ${total}`);
        console.log(`   Passed: ${passed} ✅`);
        console.log(`   Failed: ${failed} ❌`);
        console.log(`   Success Rate: ${successRate}%`);
      }
    });

    // Overall status
    const allPassed = Object.values(results).every(result => result);
    const coverageMet = this.results.coverage.percentage >= this.results.coverage.threshold;
    
    console.log('\n' + '='.repeat(50));
    if (allPassed && coverageMet) {
      console.log('🎉 All tests passed and coverage threshold met!');
      console.log('✅ Test suite completed successfully!');
    } else {
      console.log('⚠️  Some tests failed or coverage threshold not met!');
      console.log('❌ Test suite needs attention!');
    }
    console.log('='.repeat(50));
  }

  /**
   * Run specific test type
   */
  runSpecificTest(testType) {
    switch (testType) {
      case 'unit':
        return this.runUnitTests();
      case 'integration':
        return this.runIntegrationTests();
      case 'accessibility':
        return this.runAccessibilityTests();
      case 'performance':
        return this.runPerformanceTests();
      case 'coverage':
        return this.generateCoverageReport();
      case 'all':
        return this.runAllTests();
      default:
        console.error(`Unknown test type: ${testType}`);
        return false;
    }
  }

  /**
   * Clean up test artifacts
   */
  cleanup() {
    console.log('\n🧹 Cleaning up test artifacts...');
    
    try {
      // Remove coverage directory if it exists
      if (fs.existsSync(this.coverageDir)) {
        fs.rmSync(this.coverageDir, { recursive: true, force: true });
        console.log('✅ Test artifacts cleaned up!');
      }
    } catch (error) {
      console.error('❌ Failed to clean up test artifacts:', error.message);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  const testRunner = new TestRunner();

  if (args.length === 0) {
    console.log('🧪 Component Library Test Runner');
    console.log('Usage: node run-tests.js [test-type]');
    console.log('\nAvailable test types:');
    console.log('  unit          - Run unit tests only');
    console.log('  integration   - Run integration tests only');
    console.log('  accessibility - Run accessibility tests only');
    console.log('  performance   - Run performance tests only');
    console.log('  coverage      - Generate coverage report only');
    console.log('  all           - Run all tests (default)');
    console.log('  clean         - Clean up test artifacts');
    console.log('\nExamples:');
    console.log('  node run-tests.js unit');
    console.log('  node run-tests.js all');
    console.log('  node run-tests.js clean');
    return;
  }

  const testType = args[0];

  if (testType === 'clean') {
    testRunner.cleanup();
    return;
  }

  // Run the specified test
  const success = testRunner.runSpecificTest(testType);
  
  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = TestRunner;
